#!/bin/bash
# This script is meant to be run in the User Data of each EC2 Instance while it's booting. The script uses the
# run-nomad and run-consul scripts to configure and start Nomad and Consul in client mode. Note that this script
# assumes it's running in an AMI built from the Packer template in examples/nomad-consul-ami/nomad-consul.json.

set -e

# Send the log output from this script to user-data.log, syslog, and the console
# Inspired by https://alestic.com/2010/12/ec2-user-data-output/
exec > >(tee /var/log/user-data.log | logger -t user-data -s 2>/dev/console) 2>&1

# --- Mount the persistent disk with Firecracker environments.
# See https://cloud.google.com/compute/docs/disks/add-persistent-disk#create_disk
disk_name="sdb"
mount_dir="fc-envs"

mkdir -p /mnt/disks/$mount_dir
mount /dev/$disk_name /mnt/disks/fc-envs
chmod a+w /mnt/disks/$mount_dir

# Mount env buckets
mkdir -p /mnt/disks/envs-pipeline
gcsfuse e2b-fc-env-pipeline /mnt/disks/envs-pipeline

mkdir -p /mnt/disks/docker-contexts
gcsfuse e2b-envs-docker-context /mnt/disks/docker-contexts

# Setup Nomad task drivers
sudo cp /mnt/disks/envs-pipeline/env-build-task-driver -o /opt/nomad/plugins/env-build-task-driver
sudo chmod +x /opt/nomad/plugins/env-build-task-driver

sudo cp /mnt/disks/envs-pipeline/env-instance-task-driver -o /opt/nomad/plugins/env-instance-task-driver
sudo chmod +x /opt/nomad/plugins/env-instance-task-driver

# These variables are passed in via Terraform template interplation
/opt/consul/bin/run-consul.sh --client --cluster-tag-name "${cluster_tag_name}" &
/opt/nomad/bin/run-nomad.sh --client &
