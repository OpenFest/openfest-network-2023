# Server related configs
As of 2023, a hypervisor running KVM is created.

## SR-IOV

Intel's X520 network adapters we are currently using support passing through a virtual function of the NIC directly to the VM.

### Host configuration

SR-IOV should be enabled in the server's BIOS.

To create virtual functions on boot, a `udev` rule has to be created.
On dual-port cards even VF numbers are given to the first port (`..f0`). Odd ones are connected to the second port (`..f1`).

```bash
cat > /etc/udev/rules.d/enp1s0f0.rules << EOF
KERNEL=="0000:01:00.0", SUBSYSTEM=="pci", DRIVER=="ixgbe", ATTR{vendor}=="0x8086", ATTR{device}=="0x154d", ATTR{sriov_numvfs}="15"
KERNEL=="0000:01:00.1", SUBSYSTEM=="pci", DRIVER=="ixgbe", ATTR{vendor}=="0x8086", ATTR{device}=="0x154d", ATTR{sriov_numvfs}="15"
EOF
```

### Attaching a virtual function to a VM

We have to manually edit the VM's XML definition.
The function IDs must be unique as each virtual function can be used exclusively by a single VM (and is detached from the host).
Depending on our needs, we can attach:

#### In a specific VLAN (the NIC/hypervisor is responsible for tagging the frames)

```xml
    <interface type='hostdev' managed='yes'>
      <driver name='vfio'/>
      <source>
        <address type='pci' domain='0x0000' bus='0x01' slot='0x10' function='{{$FUNCTION}}'/>
      </source>
      <vlan>
        <tag id='{{$VLAN_ID}}'/>
      </vlan>
      <alias name='hostdev0'/>
      <address type='pci' domain='0x0000' bus='0x07' slot='0x00' function='0x0'/>
    </interface>
```

#### Directly (to use as a dot1q trunk)

```xml
    <interface type='hostdev' managed='yes'>
      <driver name='vfio'/>
      <source>
        <address type='pci' domain='0x0000' bus='0x01' slot='0x10' function='{{$FUNCTION}}'/>
      </source>
      <alias name='hostdev0'/>
      <address type='pci' domain='0x0000' bus='0x01' slot='0x00' function='0x0'/>
    </interface>
```

All offloading features work on virtual functions, including VLAN tagging.
