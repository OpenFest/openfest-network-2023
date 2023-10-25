#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from cmk.gui.plugins.metrics import (
    perfometer_info
)

perfometer_info.append({
    'type': 'dual',
    'perfometers': [
        {
            'type': 'linear',
            'segments': ['client_count'],
            'total': 1000,
        },
        {
            'type': 'linear',
            'segments': ['channel_usage'],
            'total': 100,
        },
    ],
})
