#!/bin/bash
ssh-add -D && ssh-add -K ~/.ssh/kimikuo2016
# 定义路径变量
path_work="/Users/admin/Desktop/work"
bingo_frontend="$path_work/bingo/bingo_test_champion"
path_pixel="$path_work/zypher-toolkit-pixel"
path_pixel_front="$path_work/zypher-toolkit-pixel_front"
path_ui="$path_pixel/ui"
path_front1="$path_pixel_front/bingo"

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
yarn
npm run build
cd ..
git fetch --prune
git add .
git commit -m "Bump version to $new_version"
git push origin pixel_version
latest_hash=$(git rev-parse HEAD)
echo "Committed hash: $latest_hash"

cd "$path_pixel_front"
git pull origin frontend
git fetch --prune
git add .
git commit -m "Bump version to $new_version"
git push origin frontend
# ------------toolkit end----------------

# ---------bingo----------------
rm -rf "$bingo_frontend/src"
cp -r "$path_front1/src" "$bingo_frontend/"
cd "$bingo_frontend/src"
perl -i -pe 's|^// import |import |' index.tsx
perl -i -pe 's|^// | |'  global.d.ts

# 更新bingo_test_beta的 yarn.lock
cd "$bingo_frontend"
echo $bingo_frontend
sed -i '' "/\"@ui@zypher-game\/toolkit\"/,/^$/d" yarn.lock
# 添加新的 "@ui@zypher-game/toolkit" 依赖项
echo -e "\"@ui@zypher-game/toolkit\":\n  version \"$new_version\"\n  resolved \"https://codeload.github.com/zypher-game/zypher-toolkit/tar.gz/$latest_hash\"" >> yarn.lock
echo "Updated dependencies in yarn.lock"
yarn

git checkout test-champion
git fetch --prune
git pull origin test-champion
git add .
git commit -m "Update to version $new_version"
git push origin test-champion


# latest_tag_bingo=$(git describe --tags --abbrev=0)
# if [ -z "$latest_tag_bingo" ]; then
#   echo "No tags found. Please create an initial tag."
#   exit 1
# fi
# # 去掉 'v' 前缀
# version_bingo=${latest_tag_bingo#v}
# # 将版本号拆分为数组
# IFS='.' read -r -a version_parts_bingo <<< "$version_bingo"
# # 递增最后一位（修订号）
# ((version_parts_bingo[2]++))
# # 重新组合新的版本号
# bingo_new_version="v${version_parts_bingo[0]}.${version_parts_bingo[1]}.${version_parts_bingo[2]}"
# # 切换到目标分支并更新代码库
# git tag -a "$bingo_new_version" -m "Version ${bingo_new_version#v}"
# # 推送到远程仓库
# git push origin "$bingo_new_version"
# echo "Updated to version $bingo_new_version"

# # git checkout test-tg
# # git fetch --prune
# # git pull origin test
# # git add .
# # git commit -m "Update to version $new_version"
# # git push origin test-tg
# # ---------bingo  end----------------

