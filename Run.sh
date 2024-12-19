#!/bin/bash

# Clear SSH agent and add the key
ssh-add -D && ssh-add -K ~/.ssh/kimikuo2016

# Define paths
path_work="/Users/admin/Desktop/work"
bingo_frontend="$path_work/bingo/bingo_test_beta"
app_test="$path_work/app/app-frontend_test"
app_ark_main="$path_work/app/app-frontend_ark_main"
path_pixel="$path_work/zypher-toolkit-pixel"
path_pixel_front="$path_work/zypher-toolkit-pixel_front"
path_ui="$path_pixel/ui"
path_front1="$path_pixel_front/bingo"
path_front2="$path_pixel_front/games"

# Function to update package.json version
update_package_version() {
    local dir="$1"
    cd "$dir" || exit
    if command -v jq > /dev/null 2>&1; then
        current_version_full=$(jq -r '.version' package.json)
        IFS='.' read -ra version_parts <<< "$current_version_full"
        ((version_parts[2]++))  # Increment patch version
        new_version="${version_parts[0]}.${version_parts[1]}.${version_parts[2]}"
        jq --arg newver "$new_version" '.version = $newver' package.json > tmp.json && mv tmp.json package.json
        echo "Version updated to $new_version"
    else
        echo "jq is not installed. Please install jq to update the JSON file."
        exit 1
    fi
    echo "$new_version"
}

# Function to build and commit changes
build_and_commit() {
    local dir="$1"
    local branch="$2"
    cd "$dir" || exit
    yarn
    npm run build
    git fetch --prune
    git add .
    git commit -m "Bump version to $new_version"
    git push origin "$branch"
}

# Function to update yarn.lock
update_yarn_lock() {
    local dir="$1"
    cd "$dir" || exit
    sed -i '' "/\"@ui@zypher-game\/toolkit\"/,/^$/d" yarn.lock
    echo -e "\"@ui@zypher-game/toolkit\":\n  version \"$new_version\"\n  resolved \"https://codeload.github.com/zypher-game/zypher-toolkit/tar.gz/$latest_hash\"" >> yarn.lock
    echo "Updated dependencies in yarn.lock"
}

# Function to handle the versioning and tagging
tag_new_version() {
    local repo="$1"
    local tag_prefix="$2"
    cd "$repo" || exit
    latest_tag=$(git describe --tags --abbrev=0)
    if [ -z "$latest_tag" ]; then
        echo "No tags found. Please create an initial tag."
        exit 1
    fi
    version=${latest_tag#"$tag_prefix"}
    IFS='.' read -r -a version_parts <<< "$version"
    ((version_parts[2]++))
    new_version="$tag_prefix${version_parts[0]}.${version_parts[1]}.${version_parts[2]}"
    git tag -a "$new_version" -m "Version ${new_version#"$tag_prefix"}"
    git push origin "$new_version"
    echo "Updated to version $new_version"
}

# ------------ toolkit ----------------
rm -rf "$path_ui/src"
cp -r "$path_pixel_front/ui/src" "$path_ui/"
new_version=$(update_package_version "$path_pixel")
build_and_commit "$path_ui" "pixel_version"
latest_hash=$(git rev-parse HEAD)

cd "$path_pixel_front" || exit
git pull origin frontend
git fetch --prune
update_yarn_lock "$path_pixel_front"
git add .
git commit -m "Bump version to $new_version"
git push origin frontend
# ------------ toolkit end ----------------

# --------- bingo ----------------
rm -rf "$bingo_frontend/src"
cp -r "$path_front1/src" "$bingo_frontend/"
cd "$bingo_frontend/src" || exit
perl -i -pe 's|^// import |import |' index.tsx
perl -i -pe 's|^// | |' global.d.ts
update_yarn_lock "$bingo_frontend"
git checkout test
git fetch --prune
git pull origin test
git add .
git commit -m "Update to version $new_version"
git push origin test
# tag_new_version "$bingo_frontend" "v"
# --------- bingo end ----------------

# --------- app_test ----------------
rm -rf "$app_test/src"
cp -r "$path_front2/src" "$app_test/"
cd "$app_test/src" || exit
perl -i -pe 's|^// import |import |' index.tsx
perl -i -pe 's|^// | |' global.d.ts
update_yarn_lock "$app_test"
git checkout test
git fetch --prune
git pull origin test
git add .
git commit -m "Update to version $new_version"
git push origin test --force
# --------- app_test end ----------------

# # --------- app_ark_main ----------------
# rm -rf "$app_ark_main/src"
# cp -r "$path_front2/src" "$app_ark_main/"
# cd "$app_ark_main/src" || exit
# perl -i -pe 's|^// import |import |' index.tsx
# perl -i -pe 's|^// | |' global.d.ts
# update_yarn_lock "$app_ark_main"
# git checkout ark_main
# git fetch --prune
# git pull origin ark_main
# git add .
# git commit -m "Update to version $new_version"
# git push origin ark_main

# tag_new_version "$app_ark_main" "v"
# # --------- app_ark_main end ----------------