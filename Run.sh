#!/bin/bash
ssh-add -D && ssh-add -K ~/.ssh/kimikuo2016
# 定义路径变量
path_work="/Users/admin/Desktop/work"
app_main="$path_work/app/app-frontend-main"
app_ark_main="$path_work/app/app-frontend_ark_main"
path_pixel="$path_work/zypher-toolkit-pixel_tvl"
path_pixel_front="$path_work/zypher-toolkit-pixel_front_tvl"
path_ui="$path_pixel/ui"
path_front2="$path_pixel_front/games"

# ------------toolkit----------------
# 删除指定目录
rm -rf "$path_ui/src"
# 复制src目录
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
export http_proxy=http://127.0.0.1:10887;export https_proxy=http://127.0.0.1:10887;
yarn
npm run build
cd ..
git pull origin tvl
git fetch --prune
git add .
git commit -m "Bump version to $new_version"
git push origin tvl
latest_hash=$(git rev-parse HEAD)
echo "Committed hash: $latest_hash"

cd "$path_pixel_front"
git pull origin frontend_tvl
git fetch --prune
git add .
git commit -m "Bump version to $new_version"
git push origin frontend_tvl
# ------------toolkit end----------------


# ---------app_master----------------
rm -rf "$app_main/src"
cp -r "$path_front2/src" "$app_main/"
cd "$app_main/src"
perl -i -pe 's|^// import |import |' index.tsx
perl -i -pe 's|^// | |'  global.d.ts

# app_main yarn.lock
cd "$app_main"
echo $app_main
sed -i '' "/\"@ui@zypher-game\/toolkit\"/,/^$/d" yarn.lock
# 添加新的 "@ui@zypher-game/toolkit" 依赖项
echo -e "\"@ui@zypher-game/toolkit\":\n  version \"$new_version\"\n  resolved \"https://codeload.github.com/zypher-game/zypher-toolkit/tar.gz/$latest_hash\"" >> yarn.lock
echo "Updated dependencies in yarn.lock"
yarn

git checkout main
git fetch --prune
git pull origin main
git add .
git commit -m "main: Change TVL end Time Staking and withdraw && Update to version $new_version"
git push origin main --force
# ---------app_master   end----------------





# # ---------app_ark_main----------------
# rm -rf "$app_ark_main/src"
# cp -r "$path_front2/src" "$app_ark_main/"
# cd "$app_ark_main/src"
# perl -i -pe 's|^// import |import |' index.tsx
# perl -i -pe 's|^// | |'  global.d.ts

# cd "$app_ark_main"
# echo $app_ark_main
# sed -i '' "/\"@ui@zypher-game\/toolkit\"/,/^$/d" yarn.lock
# # 添加新的 "@ui@zypher-game/toolkit" 依赖项
# echo -e "\"@ui@zypher-game/toolkit\":\n  version \"$new_version\"\n  resolved \"https://codeload.github.com/zypher-game/zypher-toolkit/tar.gz/$latest_hash\"" >> yarn.lock
# echo "Updated dependencies in yarn.lock"
# yarn

# # git checkout ark_main
# # git fetch --prune
# # git pull origin ark_main
# # git add .
# # git commit -m "Update to version $new_version"
# # # git tag -a v2.1.16 -m "Version 2.1.16"
# # git push origin ark_main
# # # git push origin v2.1.16

# # 获取最新的标签，假设标签格式为 vX.Y.Z
# latest_tag=$(git describe --tags --abbrev=0)
# if [ -z "$latest_tag" ]; then
#   echo "No tags found. Please create an initial tag."
#   exit 1
# fi
# # 去掉 'v' 前缀
# version=${latest_tag#v}
# # 将版本号拆分为数组
# IFS='.' read -r -a version_parts <<< "$version"
# # 递增最后一位（修订号）
# ((version_parts[2]++))
# # 重新组合新的版本号
# new_version="v${version_parts[0]}.${version_parts[1]}.${version_parts[2]}"
# # 切换到目标分支并更新代码库
# git checkout ark_main
# git fetch --prune
# git pull origin ark_main
# # 添加所有更改并提交
# git add .
# git commit -m "Update to version $new_version"
# # 创建新的标签
# git tag -a "$new_version" -m "Version ${new_version#v}"
# # 推送到远程仓库
# git push origin ark_main
# git push origin "$new_version"
# echo "Updated to version $new_version"