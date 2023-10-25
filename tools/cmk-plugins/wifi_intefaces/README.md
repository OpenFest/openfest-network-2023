# CheckMK extension for monitoring the Wi-Fi interface status @openfest.org

## Description

Monitors several 802.11 interface parameters:

- Associated station count
- Noise Floor
- Channel Usage (channel busy time / total channel time)

## Building

We use a simple library to pack the extension into a `.mkp` file without setting up a full CheckMK development server.

```bash
pip install -r requirements.txt
./build.py
```

The build artifacts are at `dist/`.

## Deployment

Copy the `mkp` file to the monitoring server and execute:

```bash
mkp install [output_file].mkp
mkp enable [plugin_name] [version]
```
