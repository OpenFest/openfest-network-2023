#!/bin/sh

wget http://10.20.0.253/openfest/check_mk/agents/check_mk_agent.openwrt -O /usr/bin/check_mk_agent
chmod 755 /usr/bin/check_mk_agent

opkg update
opkg install socat

cat > /etc/config/socat << EOF
config socat 'check_mk_agent'
	option enable '1'
	option SocatOptions '-U TCP-LISTEN:6556,fork,reuseaddr EXEC:/usr/bin/check_mk_agent'
	option user 'root'
EOF

service socat enable
service socat start
