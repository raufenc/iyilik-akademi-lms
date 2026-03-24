"""Generate PWA icons using Python PIL/Pillow or pure SVG fallback."""
import os
import struct
import zlib

# Generate PNG icons programmatically without PIL
# Using a simple approach: create solid color PNG with a star shape

def create_png(width, height, pixels):
    """Create a PNG file from pixel data."""
    def make_chunk(chunk_type, data):
        chunk = chunk_type + data
        return struct.pack('>I', len(data)) + chunk + struct.pack('>I', zlib.crc32(chunk) & 0xFFFFFFFF)

    # IHDR
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)  # 8-bit RGBA

    # IDAT - pixel data
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'  # filter byte
        for x in range(width):
            idx = (y * width + x) * 4
            raw_data += bytes(pixels[idx:idx+4])

    compressed = zlib.compress(raw_data, 9)

    # Build PNG
    png = b'\x89PNG\r\n\x1a\n'
    png += make_chunk(b'IHDR', ihdr_data)
    png += make_chunk(b'IDAT', compressed)
    png += make_chunk(b'IEND', b'')

    return png

def draw_icon(size):
    """Draw the Iyilik Akademi icon."""
    pixels = [0] * (size * size * 4)
    cx, cy = size // 2, size // 2
    radius = size // 2

    import math

    for y in range(size):
        for x in range(size):
            idx = (y * size + x) * 4
            dx, dy = x - cx, y - cy
            dist = math.sqrt(dx*dx + dy*dy)

            if dist <= radius:
                # Background: purple gradient
                t = dist / radius
                r = int(108 * (1 - t * 0.3))  # 6C = 108
                g = int(92 * (1 - t * 0.3))   # 5C = 92
                b = int(231 * (1 - t * 0.2))  # E7 = 231
                a = 255

                # Draw star
                if dist < radius * 0.65:
                    angle = math.atan2(dy, dx)
                    # 8-point star
                    star_r = radius * 0.6
                    inner_r = radius * 0.3

                    # Check if point is inside star
                    n_points = 8
                    star_angle = angle + math.pi / 2  # Rotate
                    segment = (star_angle % (2 * math.pi / n_points)) / (2 * math.pi / n_points)

                    if segment < 0.5:
                        expected_r = inner_r + (star_r - inner_r) * (segment / 0.5)
                    else:
                        expected_r = star_r - (star_r - inner_r) * ((segment - 0.5) / 0.5)

                    if dist < expected_r:
                        # Gold star color
                        gt = dist / expected_r
                        r = int(255 * (1 - gt * 0.1))
                        g = int(215 * (1 - gt * 0.15))
                        b = int(0 + gt * 80)
                        a = 255

                    # Inner circle glow
                    if dist < radius * 0.15:
                        glow_t = dist / (radius * 0.15)
                        r = int(255 * (1 - glow_t * 0.1))
                        g = int(255 * (1 - glow_t * 0.2))
                        b = int(220 * (1 - glow_t * 0.3))
                        a = 255

                # Anti-alias edge
                if dist > radius - 2:
                    a = int(255 * (radius - dist) / 2)
                    a = max(0, min(255, a))

                pixels[idx] = min(255, max(0, r))
                pixels[idx+1] = min(255, max(0, g))
                pixels[idx+2] = min(255, max(0, b))
                pixels[idx+3] = min(255, max(0, a))
            else:
                pixels[idx:idx+4] = [0, 0, 0, 0]

    return pixels

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    public_dir = os.path.join(script_dir, '..', 'public')

    for size in [192, 512]:
        print(f"Generating {size}x{size} icon...")
        pixels = draw_icon(size)
        png_data = create_png(size, size, pixels)

        path = os.path.join(public_dir, f'icon-{size}.png')
        with open(path, 'wb') as f:
            f.write(png_data)
        print(f"  -> {path} ({len(png_data)} bytes)")

if __name__ == '__main__':
    main()
