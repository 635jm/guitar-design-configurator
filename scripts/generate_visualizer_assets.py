from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "visualizer"
SIZE = 900


def slug(label: str) -> str:
    return (
        label.strip()
        .lower()
        .replace("&", "and")
        .replace("+", "plus")
        .replace("/", "-")
        .replace(" ", "-")
        .replace(".", "")
    )


BODY_SHAPES = ["Stratocaster", "Telecaster"]
BODY_COLORS = {
    "Sonic Blue": (170, 218, 229),
    "Olympic White": (238, 233, 216),
    "Trans Black": (18, 19, 20),
    "Deep Ocean Blue": (12, 70, 94),
}
BODY_MATERIALS = {
    "Alder": (218, 158, 82),
    "Ash": (225, 181, 104),
    "Mahogany": (112, 45, 18),
    "Basswood": (231, 193, 134),
}
NECK_MATERIALS = {
    "Maple": (235, 193, 118),
    "Roasted Maple": (170, 92, 37),
    "Mahogany": (119, 47, 19),
    "Wenge": (58, 48, 42),
}
PICKGUARDS = {
    "White 1-Ply": (246, 244, 236),
    "Black 3-Ply": (18, 22, 28),
    "Tortoise 4-Ply": (92, 38, 18),
    "Mint Green 3-Ply": (211, 229, 217),
    "None": None,
}
PICKUPS = ["Single Coil SSS", "HSS", "HH", "P90"]
BRIDGES = ["2-Point Tremolo", "Hardtail", "6-Saddle Tremolo", "Tune-o-matic"]
HARDWARE = {
    "Chrome": (213, 218, 223),
    "Nickel": (190, 184, 171),
    "Black": (31, 32, 34),
    "Gold": (211, 165, 62),
    "Satin Gold": (214, 176, 115),
}
KNOBS = ["Volume Taper", "Tone Taper", "Dome Metal", "Skirted Metal"]


def transparent(size: tuple[int, int] = (SIZE, SIZE)) -> Image.Image:
    return Image.new("RGBA", size, (0, 0, 0, 0))


def save(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path)


def closed_curve(points: list[tuple[float, float]], steps: int = 18) -> list[tuple[int, int]]:
    result: list[tuple[int, int]] = []
    count = len(points)
    for i in range(count):
        p0 = points[(i - 1) % count]
        p1 = points[i]
        p2 = points[(i + 1) % count]
        p3 = points[(i + 2) % count]
        for step in range(steps):
            t = step / steps
            t2 = t * t
            t3 = t2 * t
            x = 0.5 * (
                (2 * p1[0])
                + (-p0[0] + p2[0]) * t
                + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2
                + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3
            )
            y = 0.5 * (
                (2 * p1[1])
                + (-p0[1] + p2[1]) * t
                + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2
                + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3
            )
            result.append((round(x), round(y)))
    return result


def body_points(shape: str) -> list[tuple[int, int]]:
    if shape == "Telecaster":
        anchors = [
            (386, 514), (440, 504), (502, 516), (555, 548), (590, 612),
            (602, 690), (574, 758), (512, 805), (422, 815), (330, 792),
            (272, 735), (250, 650), (266, 570), (318, 520), (370, 514),
            (364, 568), (410, 566), (430, 535),
        ]
    else:
        anchors = [
            (392, 530), (344, 482), (300, 514), (314, 574), (270, 582),
            (238, 650), (260, 728), (324, 776), (398, 760), (452, 804),
            (532, 796), (590, 735), (580, 668), (628, 622), (602, 558),
            (534, 508), (484, 550), (440, 548),
        ]
    return closed_curve(anchors, 20)


def pickguard_points(shape: str) -> list[tuple[int, int]]:
    if shape == "Telecaster":
        anchors = [
            (382, 540), (512, 536), (548, 590), (534, 666), (472, 704),
            (372, 684), (334, 612), (352, 566),
        ]
    else:
        anchors = [
            (380, 536), (462, 530), (548, 572), (574, 646), (538, 725),
            (445, 728), (366, 686), (332, 604),
        ]
    return closed_curve(anchors, 16)


def make_mask(points: list[tuple[int, int]]) -> Image.Image:
    mask = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).polygon(points, fill=255)
    return mask.filter(ImageFilter.GaussianBlur(0.35))


def draw_woodgrain(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    color: tuple[int, int, int],
    alpha: int = 95,
    vertical: bool = False,
) -> None:
    x1, y1, x2, y2 = box
    rng = random.Random(sum(color) + x1 + y1)
    if vertical:
        for x in range(x1, x2, 9):
            wobble = rng.randint(-9, 9)
            shade = tuple(max(0, min(255, c + rng.randint(-22, 20))) for c in color)
            draw.line((x, y1, x + wobble, y2), fill=shade + (alpha,), width=rng.choice([1, 1, 2]))
            draw.arc((x - 38, y1 + 40, x + 42, y2 - 20), 80, 270, fill=shade + (alpha // 2,), width=1)
    else:
        for y in range(y1, y2, 10):
            wobble = rng.randint(-10, 10)
            shade = tuple(max(0, min(255, c + rng.randint(-18, 18))) for c in color)
            draw.arc((x1 - 40, y - 20, x2 + 40, y + 28 + wobble), 180, 356, fill=shade + (alpha,), width=1)


def lacquer_checking(draw: ImageDraw.ImageDraw, points: list[tuple[int, int]], color: tuple[int, int, int]) -> None:
    rng = random.Random(len(points) + sum(color))
    for _ in range(34):
        x = rng.randint(285, 585)
        y = rng.randint(548, 770)
        length = rng.randint(20, 72)
        angle = rng.uniform(-0.85, 0.85)
        x2 = x + int(math.cos(angle) * length)
        y2 = y + int(math.sin(angle) * length)
        draw.line((x, y, x2, y2), fill=(255, 255, 255, 34), width=1)


def edge_wear(draw: ImageDraw.ImageDraw, points: list[tuple[int, int]], seed: int) -> None:
    rng = random.Random(seed)
    for _ in range(18):
        x, y = points[rng.randrange(len(points))]
        r = rng.randint(3, 9)
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(202, 154, 89, rng.randint(58, 118)))
        if rng.random() > 0.45:
            draw.ellipse((x - r // 2, y - r // 2, x + r // 2, y + r // 2), fill=(74, 48, 29, rng.randint(45, 95)))


def draw_body_layer(shape: str, finish: str) -> Image.Image:
    points = body_points(shape)
    mask = make_mask(points)
    color = BODY_COLORS[finish]
    texture = transparent()
    draw = ImageDraw.Draw(texture)
    for y in range(470, 835):
        shift = int((y - 470) * 0.1)
        shade = tuple(max(0, min(255, c - 16 + shift // 5)) for c in color)
        draw.line((220, y, 650, y), fill=shade + (255,), width=1)
    grain_base = (62, 55, 48) if finish == "Trans Black" else tuple(max(0, c - 32) for c in color)
    draw_woodgrain(draw, (245, 495, 625, 825), grain_base, 78 if finish == "Trans Black" else 56)
    lacquer_checking(draw, points, color)
    edge_wear(draw, points, 1000 + len(shape) + len(finish))

    img = transparent()
    img.alpha_composite(Image.composite(texture, transparent(), mask))
    outline = transparent()
    odraw = ImageDraw.Draw(outline)
    odraw.line(points + [points[0]], fill=(22, 22, 24, 170), width=3, joint="curve")
    odraw.line(points + [points[0]], fill=(255, 255, 255, 45), width=1, joint="curve")
    h = transparent()
    hdraw = ImageDraw.Draw(h)
    hdraw.ellipse((272, 515, 420, 730), fill=(255, 255, 255, 36))
    hdraw.polygon([(498, 526), (610, 632), (556, 772), (506, 658)], fill=(255, 255, 255, 28))
    return Image.alpha_composite(Image.alpha_composite(img, h.filter(ImageFilter.GaussianBlur(13))), outline)


def draw_neck_layer(material: str) -> Image.Image:
    img = transparent()
    draw = ImageDraw.Draw(img)
    color = NECK_MATERIALS[material]
    neck = (420, 112, 480, 585)
    draw.rounded_rectangle(neck, radius=9, fill=color + (255,), outline=(88, 56, 32, 150), width=2)
    draw_woodgrain(draw, neck, tuple(max(0, c - 28) for c in color), 96, vertical=True)

    head = [(392, 58), (448, 38), (501, 67), (504, 118), (480, 151), (423, 160), (386, 127)]
    draw.polygon(head, fill=color + (255,), outline=(88, 56, 32, 150))
    draw_woodgrain(draw, (386, 38, 506, 160), tuple(max(0, c - 26) for c in color), 82, vertical=True)

    for y in [161, 189, 218, 248, 280, 314, 350, 389, 430, 474, 520, 568]:
        draw.line((421, y, 479, y), fill=(120, 98, 75, 170), width=2)
    for y in [250, 318, 386, 488]:
        draw.ellipse((446, y - 5, 456, y + 5), fill=(38, 33, 28, 220))
    for x, y in [(386, 80), (383, 104), (390, 130), (512, 76), (516, 102), (507, 128)]:
        draw.ellipse((x - 9, y - 9, x + 9, y + 9), fill=(205, 211, 216, 255), outline=(105, 110, 116, 190))
        draw.line((x - 8, y, x + 8, y), fill=(255, 255, 255, 105), width=2)
    return img


def draw_pickguard_layer(shape: str, pickguard: str) -> Image.Image:
    img = transparent()
    color = PICKGUARDS[pickguard]
    if color is None:
        return img
    points = pickguard_points(shape)
    draw = ImageDraw.Draw(img)
    if pickguard == "Tortoise 4-Ply":
        draw.polygon(points, fill=color + (255,), outline=(250, 245, 232, 165))
        rng = random.Random(91)
        for _ in range(16):
            cx = rng.randint(355, 540)
            cy = rng.randint(555, 700)
            r = rng.randint(18, 48)
            shade = rng.choice([(173, 80, 29), (209, 126, 55), (58, 24, 15), (136, 57, 24)])
            draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=shade + (116,))
    else:
        draw.polygon(points, fill=color + (255,), outline=(72, 72, 72, 100))
        if pickguard == "Black 3-Ply":
            draw.line(points + [points[0]], fill=(238, 238, 238, 145), width=2)
    for x, y in [(368, 560), (520, 560), (552, 630), (506, 704), (385, 682), (342, 612)]:
        draw.ellipse((x - 3, y - 3, x + 3, y + 3), fill=(185, 188, 190, 230), outline=(72, 72, 72, 100))
    return img


def pickup_layout(kind: str) -> list[str]:
    if kind == "HSS":
        return ["S", "S", "H"]
    if kind == "HH":
        return ["H", "H"]
    if kind == "P90":
        return ["P90", "P90"]
    return ["S", "S", "S"]


def draw_pickups_layer(shape: str, pickup: str) -> Image.Image:
    img = transparent()
    draw = ImageDraw.Draw(img)
    pieces = pickup_layout(pickup)
    start_y = 592 if len(pieces) == 3 else 618
    for i, piece in enumerate(pieces):
        y = start_y + i * 43
        if piece == "H":
            draw.rounded_rectangle((412, y, 488, y + 26), radius=4, fill=(24, 25, 26, 255), outline=(230, 230, 230, 175))
            draw.line((450, y + 3, 450, y + 23), fill=(230, 230, 230, 90), width=1)
            for x in [425, 438, 463, 476]:
                draw.ellipse((x - 2, y + 11, x + 2, y + 15), fill=(215, 215, 215, 210))
        elif piece == "P90":
            draw.rounded_rectangle((407, y, 493, y + 29), radius=8, fill=(232, 228, 216, 255), outline=(42, 42, 42, 130))
            for x in range(423, 486, 13):
                draw.ellipse((x - 2, y + 12, x + 2, y + 16), fill=(34, 34, 34, 190))
        else:
            draw.rounded_rectangle((420, y, 480, y + 18), radius=7, fill=(239, 235, 224, 255), outline=(40, 40, 40, 120))
            for x in range(430, 475, 9):
                draw.ellipse((x - 2, y + 7, x + 2, y + 11), fill=(35, 35, 35, 185))
    return img


def draw_bridge_layer(shape: str, bridge: str, hardware: str) -> Image.Image:
    img = transparent()
    draw = ImageDraw.Draw(img)
    color = HARDWARE[hardware]
    hi = tuple(min(255, c + 48) for c in color)
    y = 724
    if shape == "Telecaster":
        draw.rounded_rectangle((390, y - 10, 512, y + 48), radius=5, fill=color + (255,), outline=(38, 38, 38, 135))
        for i in range(6):
            x = 408 + i * 14
            draw.rectangle((x, y + 4, x + 9, y + 28), fill=hi + (255,), outline=(80, 80, 80, 125))
        draw.rounded_rectangle((526, 604, 558, 730), radius=14, fill=color + (230,), outline=(55, 55, 55, 120))
        return img
    if bridge == "Tune-o-matic":
        draw.rounded_rectangle((400, y, 506, y + 20), radius=6, fill=color + (255,), outline=(38, 38, 38, 120))
        draw.rounded_rectangle((420, y + 42, 486, y + 55), radius=4, fill=color + (225,))
    elif bridge == "Hardtail":
        draw.rounded_rectangle((402, y - 8, 504, y + 40), radius=7, fill=color + (255,), outline=(38, 38, 38, 130))
    else:
        draw.rounded_rectangle((396, y - 8, 508, y + 45), radius=7, fill=color + (255,), outline=(38, 38, 38, 130))
        draw.line((505, y + 12, 556, y - 31), fill=hi + (235,), width=5)
    for i in range(6):
        x = 413 + i * 14
        draw.rectangle((x, y + 2, x + 8, y + 21), fill=hi + (255,), outline=(80, 80, 80, 120))
    return img


def draw_knobs_layer(shape: str, knobs: str, hardware: str) -> Image.Image:
    img = transparent()
    draw = ImageDraw.Draw(img)
    color = HARDWARE[hardware]
    coords = [(535, 656), (558, 702), (510, 738)]
    if shape == "Telecaster":
        coords = [(542, 642), (542, 696)]
    for x, y in coords:
        r = 17 if "Dome" in knobs else 15
        draw.ellipse((x - r, y - r, x + r, y + r), fill=color + (255,), outline=(40, 40, 40, 120))
        draw.arc((x - r + 4, y - r + 4, x + r - 4, y + r - 4), 210, 40, fill=(255, 255, 255, 150), width=2)
    return img


def draw_string_layer() -> Image.Image:
    img = transparent()
    draw = ImageDraw.Draw(img)
    for offset in [-17, -10, -4, 2, 9, 16]:
        draw.line((450 + offset, 78, 450 + offset, 764), fill=(245, 245, 245, 185), width=1)
    return img


def draw_shadow_layer(shape: str) -> Image.Image:
    img = transparent()
    draw = ImageDraw.Draw(img)
    draw.ellipse((248, 774, 628, 846), fill=(0, 0, 0, 50))
    return img.filter(ImageFilter.GaussianBlur(16))


def draw_gloss_layer(shape: str) -> Image.Image:
    img = transparent()
    draw = ImageDraw.Draw(img)
    draw.polygon([(292, 612), (360, 525), (392, 562), (328, 724)], fill=(255, 255, 255, 34))
    draw.polygon([(500, 522), (604, 628), (552, 756), (502, 626)], fill=(255, 255, 255, 24))
    return img.filter(ImageFilter.GaussianBlur(4))


def draw_thumbnail(category: str, label: str) -> Image.Image:
    img = Image.new("RGBA", (240, 150), (248, 249, 250, 255))
    draw = ImageDraw.Draw(img)
    if category == "body-shapes":
        shape = "Telecaster" if label == "Telecaster" else "Stratocaster"
        poly = [(int(x * 0.23) + 62, int(y * 0.23) - 82) for x, y in body_points(shape)]
        draw.polygon(poly, fill=(132, 136, 145, 255))
    elif category == "finishes":
        draw.rounded_rectangle((20, 18, 220, 132), radius=18, fill=BODY_COLORS[label] + (255,))
        draw_woodgrain(draw, (28, 28, 212, 122), tuple(max(0, c - 24) for c in BODY_COLORS[label]), 70)
    elif category in {"body-materials", "neck-materials"}:
        color = BODY_MATERIALS.get(label) or NECK_MATERIALS.get(label) or (210, 210, 210)
        draw.rounded_rectangle((20, 18, 220, 132), radius=18, fill=color + (255,))
        draw_woodgrain(draw, (28, 28, 212, 122), tuple(max(0, c - 25) for c in color), 82)
    elif category == "pickguards":
        color = PICKGUARDS[label]
        if color is None:
            draw.line((50, 120, 190, 30), fill=(190, 190, 190, 255), width=6)
            draw.ellipse((54, 24, 186, 126), outline=(210, 210, 210, 255), width=3)
        else:
            poly = [(int(x * 0.52) - 110, int(y * 0.52) - 245) for x, y in pickguard_points("Stratocaster")]
            draw.polygon(poly, fill=color + (255,), outline=(160, 160, 160, 120))
    elif category == "pickups":
        for i, piece in enumerate(pickup_layout(label)):
            x = 50 + i * 50
            if piece == "H":
                draw.rounded_rectangle((x, 54, x + 44, 92), radius=5, fill=(28, 28, 28, 255))
            elif piece == "P90":
                draw.rounded_rectangle((x - 8, 56, x + 54, 90), radius=8, fill=(236, 233, 224, 255), outline=(80, 80, 80, 140))
            else:
                draw.rounded_rectangle((x, 62, x + 42, 84), radius=8, fill=(236, 233, 224, 255), outline=(80, 80, 80, 140))
    elif category == "bridges":
        draw.rounded_rectangle((55, 56, 185, 98), radius=8, fill=(203, 208, 214, 255), outline=(80, 80, 80, 100))
        for i in range(6):
            draw.rectangle((70 + i * 17, 64, 80 + i * 17, 90), fill=(240, 242, 244, 255), outline=(80, 80, 80, 90))
    elif category == "hardware-finishes":
        color = HARDWARE[label]
        draw.ellipse((62, 22, 178, 138), fill=color + (255,), outline=(80, 80, 80, 120))
        draw.arc((82, 42, 158, 118), 210, 40, fill=(255, 255, 255, 180), width=7)
    elif category == "knobs":
        draw.ellipse((70, 25, 170, 125), fill=(203, 208, 214, 255), outline=(80, 80, 80, 120))
        draw.line((120, 45, 120, 75), fill=(80, 80, 80, 180), width=5)
    return img


def generate() -> None:
    for shape in BODY_SHAPES:
        shape_slug = slug(shape)
        save(draw_shadow_layer(shape), OUT / "layers" / shape_slug / "shadow.png")
        save(draw_gloss_layer(shape), OUT / "layers" / shape_slug / "gloss.png")
        for finish in BODY_COLORS:
            save(draw_body_layer(shape, finish), OUT / "layers" / shape_slug / "body" / f"{slug(finish)}.png")
        for material in NECK_MATERIALS:
            save(draw_neck_layer(material), OUT / "layers" / shape_slug / "neck" / f"{slug(material)}.png")
        for pickguard in PICKGUARDS:
            save(draw_pickguard_layer(shape, pickguard), OUT / "layers" / shape_slug / "pickguard" / f"{slug(pickguard)}.png")
        for pickup in PICKUPS:
            save(draw_pickups_layer(shape, pickup), OUT / "layers" / shape_slug / "pickups" / f"{slug(pickup)}.png")
        for bridge in BRIDGES:
            for hardware in HARDWARE:
                save(draw_bridge_layer(shape, bridge, hardware), OUT / "layers" / shape_slug / "bridge" / f"{slug(bridge)}-{slug(hardware)}.png")
        for knob in KNOBS:
            for hardware in HARDWARE:
                save(draw_knobs_layer(shape, knob, hardware), OUT / "layers" / shape_slug / "knobs" / f"{slug(knob)}-{slug(hardware)}.png")
        save(draw_string_layer(), OUT / "layers" / shape_slug / "strings.png")

    thumb_groups = {
        "body-shapes": BODY_SHAPES,
        "finishes": BODY_COLORS.keys(),
        "body-materials": BODY_MATERIALS.keys(),
        "neck-materials": NECK_MATERIALS.keys(),
        "pickguards": PICKGUARDS.keys(),
        "pickups": PICKUPS,
        "bridges": BRIDGES,
        "hardware-finishes": HARDWARE.keys(),
        "knobs": KNOBS,
    }
    for category, labels in thumb_groups.items():
        for label in labels:
            save(draw_thumbnail(category, label), OUT / "thumbnails" / category / f"{slug(label)}.png")


if __name__ == "__main__":
    generate()
