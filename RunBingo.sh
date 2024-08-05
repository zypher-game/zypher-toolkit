#!/bin/bash
ssh-add -D && ssh-add -K ~/.ssh/kimikuo2016
# 定义路径变量
path_work="/Users/admin/Desktop/work"
path_app_frontend="$path_work/bingo/bingo_test_beta"
path_pixel="$path_work/zypher-toolkit-pixel"
path_pixel_front="$path_work/zypher-toolkit-pixel_front"
path_ui="$path_pixel/ui"
path_front="$path_pixel_front/bingo"

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
yarn
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
# # 修改bingo_test_beta下的文件
cd "$path_app_frontend/src"
perl -i -pe 's|^// import |import |' index.tsx
perl -i -pe 's|^// | |'  global.d.ts

# 更新bingo_test_beta的 yarn.lock
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
