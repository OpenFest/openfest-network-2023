# IP ranges assignments

## VLANs

| ID   | IPv4         | IPv6           | Name             | Notes                    |
| ---- | ------------ | -------------- | ---------------- | ------------------------ |
| 10   | single ip    | N/A            | internet_backup  | Provided by venue        |
| 20   | 10.20.0.0/24 | N/A            | mgmt             | Switch/AP management     |
| 21   | 10.21.0.0/22 | $NET6:21::1/64 | wired            | Wired clients            |
| 22   | 10.22.0.0/22 | $NET6:22::1/64 | wireless         | wireless clients (on AP) |
| 23   | 10.23.0.0/24 | N/A            | video            | Video team               |
| 24   | 10.24.0.0/24 | N/A            | overflow         | Overflow TVs             |
| 25   | 10.25.0.0/24 | N/A            | reception        | Reception related        |
| 26   | 10.26.0.0/24 | N/A            | VoIP             | Phones                   |
| 2222 | $PREFIX4/29  | $PREFIX6/64    | internet_primary | ?                        |

## DHCP Pools

| NetworkID | Start       | End         | Domain Suffix          | Lease Time (sec) |
| --------- | ----------- | ----------- | ---------------------- | ---------------- |
| 20        | 10.20.0.100 | 10.20.0.250 | openfest.org           | 7200             |
| 21        | 10.21.0.100 | 10.21.3.250 | net.openfest.org       | 600              |
| 22        | 10.22.0.100 | 10.22.3.250 | net.openfest.org       | 600              |
| 23        | 10.23.0.100 | 10.23.0.250 | video.openfest.org     | 7200             |
| 24        | 10.24.0.100 | 10.24.0.250 | overflow.openfest.org  | 7200             |
| 25        | 10.25.0.100 | 10.25.0.250 | reception.openfest.org | 7200             |
| 26        | 10.26.0.100 | 10.26.0.250 | voice.openfest.org     | 7200             |

## Assignments (Static or reserved)

### MGMT

| IP   | Name        | Notes                    |
| ---- | ----------- | ------------------------ |
| .1   | gateway     | router                   |
| .2   | dns         | DNS/DHCP                 |
| .11  | coresw      | core switch              |
| .15  | fl0sw       | floor 0 switch           |
| .21  | vocsw-A     | video team switch room A |
| .22  | vocsw-B     | video team switch room B |
| .25  | receptionsw | video team switch room A |
| .28  | nocsw       | NOC                      |
| .253 | monitoring  | Monitoring server        |
| .254 | sonata      | hypervisor management    |


### Wired

| IP  | Name    | Notes    |
| --- | ------- | -------- |
| .1  | gateway | router   |
| .2  | dns     | DNS/DHCP |

### Wireless

| IP  | Name    | Notes    |
| --- | ------- | -------- |
| .1  | gateway | router   |
| .2  | dns     | DNS/DHCP |

### Video

| IP  | Name    | Notes    |
| --- | ------- | -------- |
| .1  | gateway | router   |
| .2  | dns     | DNS/DHCP |

### Overflow

| IP  | Name    | Notes    |
| --- | ------- | -------- |
| .1  | gateway | router   |
| .2  | dns     | DNS/DHCP |

### Reception

| IP  | Name    | Notes    |
| --- | ------- | -------- |
| .1  | gateway | router   |
| .2  | dns     | DNS/DHCP |

### VoIP

| IP  | Name    | Notes    |
| --- | ------- | -------- |
| .1  | gateway | router   |
| .2  | dns     | DNS/DHCP |
| .3  | voip    | asterisk |
