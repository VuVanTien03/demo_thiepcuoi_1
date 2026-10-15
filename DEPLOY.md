# Hướng Dẫn Deploy Dự Án Thiệp Cưới (Docker & Cloudflare)

Dự án thiệp cưới React (Vite) đã được cấu hình sẵn đầy đủ:
- **Dockerfile** (Multi-stage build Node 20 -> Nginx Alpine siêu nhẹ, tối ưu nén Gzip, cache ảnh/âm thanh và định tuyến SPA).
- **nginx.conf** (Cấu hình Nginx chuẩn cho Single Page App, chống lỗi 404 khi F5).
- **docker-compose.yml** (Chạy nhanh với 1 câu lệnh).
- **.dockerignore** (Tối ưu kích thước build Docker).

---

## 🚀 Cách 1: Deploy lên Cloudflare Pages (Khuyên dùng nhất - Miễn phí 100%, nhanh nhất)

Vì đây là website React (Vite) được build ra mã tĩnh (`dist/`), **Cloudflare Pages** là nền tảng tối ưu nhất thế giới với CDN toàn cầu, bảo mật SSL tự động và băng thông không giới hạn.

### Lựa chọn A: Deploy trực tiếp bằng lệnh Wrangler (Không cần Git)
1. Build dự án:
   ```bash
   npm run build
   ```
2. Đăng nhập và deploy lên Cloudflare Pages:
   ```bash
   npx wrangler pages deploy dist --project-name thiep-cuoi
   ```
   *(Lần đầu chạy, trình duyệt sẽ tự mở để bạn bấm xác thực tài khoản Cloudflare)*.

### Lựa chọn B: Kết nối qua GitHub / GitLab
1. Đẩy code lên repository GitHub.
2. Vào trang quản trị [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Chọn repo và điền cấu hình build:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Bấm **Save and Deploy**. Mỗi khi bạn push code mới, Cloudflare sẽ tự động build và cập nhật ngay lập tức.

---

## 🐳 Cách 2: Đóng gói và chạy bằng Docker

### 1. Khởi động Docker Desktop
Đảm bảo bạn đã mở ứng dụng **Docker Desktop** trên máy tính.

### 2. Build Docker Image
```bash
docker build -t thiep-cuoi-app:latest .
```

### 3. Chạy Container độc lập
```bash
docker run -d --name thiep_cuoi -p 8080:80 thiep-cuoi-app:latest
```
Truy cập: `http://localhost:8080`

### 4. Hoặc chạy bằng Docker Compose (Tiện lợi nhất)
```bash
docker compose up -d
```
- Để dừng container:
  ```bash
  docker compose down
  ```

---

## 🌐 Cách 3: Chạy Docker kết hợp Cloudflare Tunnel (cloudflared)

Nếu bạn chạy Docker trên máy tính cá nhân hoặc máy chủ riêng (VPS) nhưng muốn gắn tên miền Cloudflare mà không cần mở port modem / IP tĩnh:

1. Chạy Docker container của thiệp cưới ở cổng `8080`.
2. Tạo Tunnel trên [Cloudflare Zero Trust](https://one.dash.cloudflare.com/) > **Networks** > **Tunnels**.
3. Cài đặt `cloudflared` và trỏ domain về:
   - **Service**: `HTTP`
   - **URL**: `localhost:8080`
4. Website của bạn sẽ có HTTPS miễn phí và truy cập được trên toàn cầu thông qua domain Cloudflare!
