# CheckMK Plugins

Monitoring plugins for Openfest 2023

## Installation

Built-in plugins are downloaded directly from the monitoring site ([Internal URL](http://monitoring.openfest.org/)).
Custom plugins are downloaded from this repo.

The files are installed to `/usr/lib/check_mk_agent/plugins` with execute permissions (ex. `755`).

## Plugin List

| Name         | Type                                            | Installed on | Notes                        |
| ------------ | ----------------------------------------------- | ------------ | ---------------------------- |
| qemu         | [Custom](https://exchange.checkmk.com/p/qemu-1) | sonata       | Patched to work on debian 12 |
| smart        | Built-in                                        | sonata       | Disk SMART monitoring        |
| isc_dhcpd.py | Built-in                                        | dns          | DHCP pool usage              |
