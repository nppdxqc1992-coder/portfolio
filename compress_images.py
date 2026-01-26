# -*- coding: utf-8 -*-
from PIL import Image
import os
import shutil

# 源文件夹
source_base = r'E:\00那澎湃的小青春\壹合作品\项目效果图'
target_base = r'e:\ai编程\个人简历网页版\images'

# 清空目标文件夹
if os.path.exists(target_base):
    shutil.rmtree(target_base)
os.makedirs(target_base)

# 项目配置：(源文件夹路径, 目标文件夹名)
projects = [
    # 1中式项目
    ('1中式项目/1海盐春风如意里', 'haiyan'),
    ('1中式项目/2扬州中和绿城春江明月', 'yangzhou'),
    ('1中式项目/3王江泾风荷九里', 'fenghe'),
    ('1中式项目/4盐城百禾小镇', 'baihe'),
    ('1中式项目/5淮北桃花源', 'taohuayuan'),
    # 2现代中式
    ('2现代中式/6嘉兴世合理想大地', 'shiheli'),
    ('2现代中式/7嘉兴秀璟湾', 'xiujingwan'),
    # 3现代项目（按文件夹序号排列）
    ('3现代项目/1柳州B31地块项目', 'b31'),
    ('3现代项目/2台州凤语和鸣', 'fengyu'),
    ('3现代项目/3安徽巢湖犇山壹品', 'chaohu'),
    ('3现代项目/4杭州西溪印', 'xixiyin'),
    ('3现代项目/5台州创融润园', 'runyuan'),
]

# 高精度设置
WIDTH = 1800  # 宽度1800px
QUALITY = 95  # 质量95%

for src_path, dst_name in projects:
    src_folder = os.path.join(source_base, src_path)
    dst_folder = os.path.join(target_base, dst_name)

    if not os.path.exists(src_folder):
        print(f'Warning: {src_folder} not found, skipping...')
        continue

    os.makedirs(dst_folder, exist_ok=True)

    # 获取所有图片文件
    files = [f for f in os.listdir(src_folder) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]

    # 分离00封面和其他图片
    cover = None
    others = []
    for f in files:
        if f.startswith('00'):
            cover = f
        else:
            others.append(f)

    # 排序其他图片
    others.sort()

    # 重新组织：00作为1.jpg，其他按顺序
    ordered_files = []
    if cover:
        ordered_files.append(cover)
    ordered_files.extend(others)

    print(f'Processing {src_path} ({len(ordered_files)} images)...')

    for i, filename in enumerate(ordered_files, 1):
        src_file = os.path.join(src_folder, filename)
        dst_file = os.path.join(dst_folder, f'{i}.jpg')

        try:
            img = Image.open(src_file)

            # 计算新尺寸
            ratio = WIDTH / img.width
            height = int(img.height * ratio)

            # 高质量缩放
            img = img.resize((WIDTH, height), Image.LANCZOS)

            # 转换为RGB
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')

            # 保存高质量JPEG
            img.save(dst_file, 'JPEG', quality=QUALITY, optimize=True)
            print(f'  {i}.jpg saved')
        except Exception as e:
            print(f'  Error processing {filename}: {e}')

    print(f'  Done! {len(ordered_files)} images saved to {dst_folder}\n')

print('All done!')
