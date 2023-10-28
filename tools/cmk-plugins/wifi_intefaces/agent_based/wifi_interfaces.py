#!/usr/bin/env python3

from .agent_based_api.v1 import *

def check_wifi_status(item, section):
    print(item)
    print(section)

    for interface in section:
        if interface['name'] == item:
            usage = interface['delta_ch_time_busy'] / interface['delta_ch_time'] * 100
            yield Metric("delta_ch_time", interface['delta_ch_time'])
            yield Metric("delta_ch_time_busy", interface['delta_ch_time_busy'])
            yield Metric("channel_usage", usage, levels=(0,100))
            yield Metric("noise_floor", interface['noise'], levels=(-120,0))
            yield Metric("client_count", interface['client_count'], levels=(0,None))

            if usage < 30:
                yield Result(state = State.OK, summary = f"Clients: {interface['client_count']}, Channel usage: {usage:.02f}%")
            elif usage < 60:
                yield Result(state = State.WARN, summary = f"Clients: {interface['client_count']}, Channel usage: {usage:.02f}%")
            else:
                yield Result(state = State.CRIT, summary = f"Clients: {interface['client_count']}, Channel usage: {usage:.02f}%")

def discover_wifi_status(section):
    print(section)
    for interface in section:
        yield Service(item=interface['name'])

def parse_wifi_interfaces(string_table):
    # format: "$interface;$ch_time;$ch_time_busy;$noise;$delta_ch_time;$delta_ch_time_busy,$client_count"
    return [{
            'name': row[0],
            'ch_time' : int(row[1]),
            'ch_time_busy' : int(row[2]),
            'noise' : int(row[3]),
            'delta_ch_time' : int(row[4]),
            'delta_ch_time_busy' : int(row[5]),
            'client_count' : int(row[6]),
        } for row in string_table]

register.agent_section(
    name = "wifi_interfaces",
    parse_function = parse_wifi_interfaces,
)

register.check_plugin(
    name="wifi_interface_status",
    service_name="Wi-Fi Interface %s",
    discovery_function=discover_wifi_status,
    sections=['wifi_interfaces'],
    check_function=check_wifi_status
)
