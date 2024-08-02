# 定义一个函数来执行 cd 和 yarn
execute_cd_yarn() {
  local dir=$1
  echo "Changing to directory: $dir"
  cd "$dir" || echo "Warning: Directory '$dir' not found or inaccessible, continuing anyway."
  yarn || echo "Error: yarn command failed in directory '$dir'"
}

# 执行函数
execute_cd_yarn "/Users/admin/Desktop/work/zypher-toolkit-pixel_front/ui"
execute_cd_yarn "/Users/admin/Desktop/work/zypher-toolkit-pixel_front/games"
execute_cd_yarn "/Users/admin/Desktop/work/zypher-toolkit-pixel_front/bingo"
