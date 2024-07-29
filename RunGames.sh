#!/bin/bash
ssh-add -D && ssh-add -K ~/.ssh/kimikuo2016
# 定义路径变量
path_work="/Users/admin/Desktop/work"
path_app_frontend="$path_work/app-frontend_test"
path_pixel="$path_work/zypher-toolkit-pixel"
path_pixel_front="$path_work/zypher-toolkit-pixel_front"
path_ui="$path_pixel/ui"
path_front="$path_pixel_front/games"

# # # 删除指定目录
rm -rf "$path_app_frontend/src"
rm -rf "$path_ui/src"

# 复制src目录
cp -r "$path_front/src" "$path_app_frontend/"
cp -r "$path_pixel_front/ui/src" "$path_ui/"

# 进入目录并更新package.json的version字段
cd "$path_pixel"
if command -v jq > /dev/null 2>&1; then
    # 读取当前version
    current_version_full=$(jq -r '.version' package.json)
    
    # 分割版本号为数组，假设版本号格式为 x.y.z
    IFS='.' read -ra version_parts <<< "$current_version_full"
    major=${version_parts[0]}
    minor=${version_parts[1]}
    patch=${version_parts[2]}

    # 递增修订版本号
    ((patch++))

    # 重组新版本号
    new_version="$major.$minor.$patch"

    # 更新version字段
    jq --arg newver "$new_version" '.version = $newver' package.json > tmp.json && mv tmp.json package.json
    
    echo "Version updated to $new_version"
else
    echo "jq is not installed. Please install jq to update the JSON file."
fi


# 构建ui并提交更改
cd "$path_ui"
npm run build
cd ..
git fetch --prune
git add .
git commit -m "Bump version to $new_version"
git push origin pixel_version
latest_hash=$(git rev-parse HEAD)
echo "Committed hash: $latest_hash"
# version=0.1.22
# latest_hash=94dbff562a754f90e1af03774f49c1dc784a4e91
# # 修改app-frontend_test下的文件
cd "$path_app_frontend/src"
perl -i -pe 's|^// import |import |' index.tsx
perl -i -pe 's|^// | |'  global.d.ts

# 更新app-frontend_test的 yarn.lock
cd "$path_app_frontend"
echo $path_app_frontend
# 定义新版本号和hash值

# 删除 yarn.lock 文件中的 "@ui@zypher-game/toolkit" 依赖项
sed -i '' "/\"@ui@zypher-game\/toolkit\"/,/^$/d" yarn.lock

# 添加新的 "@ui@zypher-game/toolkit" 依赖项
echo -e "\"@ui@zypher-game/toolkit\":\n  version \"$new_version\"\n  resolved \"https://codeload.github.com/zypher-game/zypher-toolkit/tar.gz/$latest_hash\"" >> yarn.lock
echo "Updated dependencies in yarn.lock"

# 最后运行命令
yarn
npm start

# 将 yarn.lock 文件夹里的


# "@ui@zypher-game/toolkit":
#   version "0.1.20"
#   resolved "https://codeload.github.com/zypher-game/zypher-toolkit/tar.gz/83a5745ee9cd503d71d76c38763d5ecc79604402"

# 替换成 

# version=0.1.22
# latest_hash=94dbff562a754f90e1af03774f49c1dc784a4e91

# "@ui@zypher-game/toolkit":
#   version "$version"
#   resolved "https://codeload.github.com/zypher-game/zypher-toolkit/tar.gz/$latest_hash"

# 删除  /Users/admin/Desktop/work/app-frontend_test/src 文件夹
# 删除  /Users/admin/Desktop/work/zypher-toolkit-pixel/ui/src 文件夹

# 复制 /Users/admin/Desktop/work/zypher-toolkit-pixel_front/front 下的 src 文件夹 到 /Users/admin/Desktop/work/app-frontend_test/ 
# 复制 /Users/admin/Desktop/work/zypher-toolkit-pixel_front/ui 下的 src 文件夹 到 /Users/admin/Desktop/work/zypher-toolkit-pixel/ui/


# 到/Users/admin/Desktop/work/zypher-toolkit-pixel/ 文件夹下 
# 修改 package.json 使  version  的值 + 0.01 保存当前 version 的值
# 运行 cd ui && npm run build && cd ..
# git push 到  pixel_version 分支上， 并 复制 推上去的hash  保存 hash 的值


# 到 /Users/admin/Desktop/work/app-frontend_test/src 文件夹下 
# 修改 index.tsx 将 // import '../node_modules/@ui/ui/dist/index.css'  改成  import '../node_modules/@ui/ui/dist/index.css'
# 修改 global.d.ts 将 
# // declare module '@ui/src' {
# //   export * from '@ui/ui'
# // }  
# 改成  
# declare module '@ui/src' {
#   export * from '@ui/ui'
# }

# 到 /Users/admin/Desktop/work/app-frontend_test 文件夹下 将

# "@ui@zypher-game/toolkit":
#   version "0.1.20"
#   resolved "https://codeload.github.com/zypher-game/zypher-toolkit/tar.gz/83a5745ee9cd503d71d76c38763d5ecc79604402"
# 替换成

# "@ui@zypher-game/toolkit":
#   version 上面保存的 version 值
#   resolved "https://codeload.github.com/zypher-game/zypher-toolkit/tar.gz/上面保存的 hash 的值"

# 到 /Users/admin/Desktop/work/app-frontend_test 文件夹下运行  yarn && npm start

