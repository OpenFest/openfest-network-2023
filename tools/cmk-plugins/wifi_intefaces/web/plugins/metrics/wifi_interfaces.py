#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import cmk.utils.render

from cmk.gui.i18n import _
from cmk.gui.plugins.metrics.utils import (
    graph_info,
    indexed_color,
    metric_info,
    parse_color_into_hexrgb,
)


metric_info["channel_usage"] = {
    "title": _("Channel Usage"),
    "unit": "%",
    "color": "11/a",
}

metric_info["noise_floor"] = {
    "title": _("Noise Floor"),
    "unit": "dbm",
    "color": "11/b",
}

metric_info["delta_ch_time"] = {
    "title": _("Channel Time delta"),
    "unit": "1/s",
    "color": "33/a",
}

metric_info["delta_ch_time_busy"] = {
    "title": _("Channel Busy Time delta"),
    "unit": "1/s",
    "color": "13/a",
}

metric_info["client_count"] = {
    "title": _("Client Count"),
    "unit": "count",
    "color": "13/b",
}


graph_info["channel_usage"] = {
    "title": _("Channel Usage"),
    "metrics": [
        ("channel_usage", "line")
    ],
    "range": (0, 100),
}

graph_info["client_count"] = {
    "title": _("Client Count"),
    "metrics": [
        ("client_count", "line")
    ],
}

graph_info["noise_floor"] = {
    "title": _("Noise Floor"),
    "metrics": [
        ("noise_floor", "line")
    ],
    "range": (-120, 0),
}

graph_info["channel_times"] = {
    "title": _("Channel Times"),
    "metrics": [
        ("delta_ch_time", "line"),
        ("delta_ch_time_busy", "area")
    ],
}