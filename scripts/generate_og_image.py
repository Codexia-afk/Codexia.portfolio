import os
from PIL import Image, ImageDraw, ImageFont

def generate_og_image():
    width, height = 1200, 630
    # Dark zinc background
    bg_color = (9, 9, 11)
    img = Image.new("RGB", (width, height), bg_color)
    draw = ImageDraw.Draw(img)

    # Draw ambient orbital concentric rings
    center_x, center_y = 950, 315
    for r, opacity, width_px in [(180, 40, 1), (300, 30, 1), (450, 20, 1), (600, 15, 1)]:
        color = (6, 182, 212, opacity) # cyan glow
        bbox = [center_x - r, center_y - r, center_x + r, center_y + r]
        draw.ellipse(bbox, outline=(6, 182, 212), width=width_px)

    # Draw cyan satellite node
    draw.ellipse([center_x - 180 - 6, center_y - 6, center_x - 180 + 6, center_y + 6], fill=(6, 182, 212))

    # Grid line accents
    draw.line([(0, 0), (1200, 0)], fill=(39, 39, 42), width=4) # top border
    draw.line([(80, 0), (80, 630)], fill=(24, 24, 27), width=1)
    
    # Try loading a system sans font or default font
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", index=1, size=54)
        font_role = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", index=0, size=24)
        font_sub = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", index=0, size=22)
        font_badge = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", index=1, size=14)
    except Exception:
        font_title = ImageFont.load_default()
        font_role = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_badge = ImageFont.load_default()

    # Left content block
    margin_left = 100

    # Badge pill
    badge_text = "● AI ENGINEER & ML ENGINEER"
    draw.rectangle([margin_left, 130, margin_left + 360, 166], fill=(18, 18, 22), outline=(6, 182, 212), width=1)
    draw.text((margin_left + 16, 140), badge_text, fill=(6, 182, 212), font=font_badge)

    # Main Name
    draw.text((margin_left, 200), "Srinjoy Pramanick", fill=(244, 244, 245), font=font_title)

    # Animated Roles / Specialty
    draw.text((margin_left, 280), "AI ENGINEER  ·  FULL-STACK DEVELOPER", fill=(161, 161, 170), font=font_role)

    # Tagline / Description
    desc_line1 = "Architecting intelligent systems, explainable AI guardrails,"
    desc_line2 = "autonomous agent infrastructure, and high-performance applications."
    draw.text((margin_left, 350), desc_line1, fill=(113, 113, 122), font=font_sub)
    draw.text((margin_left, 385), desc_line2, fill=(113, 113, 122), font=font_sub)

    # Bottom domain / GitHub pill footer
    draw.line([(margin_left, 470), (margin_left + 700, 470)], fill=(39, 39, 42), width=1)
    draw.text((margin_left, 495), "srinjoypramanick.dev  |  github.com/Codexia-afk", fill=(6, 182, 212), font=font_role)

    # Output directory
    out_dir = os.path.join(os.path.dirname(__file__), "..", "public")
    out_path = os.path.join(out_dir, "og-image.png")
    img.save(out_path, "PNG")
    print(f"Generated OG image at: {out_path}")

if __name__ == "__main__":
    generate_og_image()
