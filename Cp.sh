#!/bin/bash

# 指定源目录和目标目录
source_dir="/Users/admin/Downloads/1"
destination_dir="/Users/admin/Downloads/2"

# 确保目标目录存在
mkdir -p "$destination_dir"

# 使用 find 命令查找所有 MP4 文件，并复制到目标目录
while IFS= read -r -d $'\0' file; do
  cp -v "$file" "$destination_dir"
done < <(find "$source_dir" -type f -name "*.mp4" -print0)

# 更改复制文件的权限
chmod 644 "$destination_dir"/*.mp4

# 更改目标文件夹的权限
chmod 755 "$destination_dir"

echo "All MP4 files have been copied to $destination_dir"
