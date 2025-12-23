## 1. Tổng quan tính năng

**Tên epic:** ChatImageGrid – Hỗ trợ Video
**Mục tiêu kinh doanh:**

* Cho phép người dùng xem, phát và tải **video** ngay trong ChatImageGrid
* Trải nghiệm video **nhất quán như hình ảnh** (thumbnail, blurhash, loading, download progress)
* Tăng mức độ tương tác với nội dung đa phương tiện trong chat

---

## 2. Phạm vi (Scope)

### In-scope

* Video hiển thị trong ChatImageGrid
* Video có thumbnail + blurhash
* Play video inline / fullscreen
* Download image & video có progress

---

## 3. Business Rules

1. Video được **xem như một item media giống image**
2. Grid layout **không phân biệt image hay video**
3. Blurhash luôn hiển thị trước khi media load xong
4. Download phải:

   * Hiển thị progress mb/mb
   * Cho phép cancel
   * Thông báo khi hoàn tất / lỗi

---

## 4. User Stories (Jira-ready)

### US-01: Hiển thị video trong ChatImageGrid

**As a** user
**I want** video xuất hiện trong ChatImageGrid giống như hình ảnh
**So that** tôi có thể xem nội dung video trực tiếp trong luồng chat

**Acceptance Criteria**

* Video xuất hiện như 1 tile trong grid
* Có **thumbnail** đại diện
* Có **icon play** overlay
* Có **blurhash** khi chưa load xong thumbnail
* Video được tính vào layout grid giống image (same size rules)

---

### US-02: Play video trong ChatImageGrid

**As a** user
**I want** phát video trực tiếp từ ChatImageGrid
**So that** tôi không cần mở app khác để xem

**Acceptance Criteria**

* Tap vào video → play
* Hỗ trợ:

  * Play inline trong grid **hoặc**
  * Mở fullscreen viewer
* Có các control cơ bản:

  * Play / Pause
  * Seek
  * Mute / Unmute
* Video auto pause khi:

  * User scroll ra khỏi viewport
  * User đóng viewer

---

### US-03: Blurhash & loading cho video

**As a** user
**I want** thấy preview mượt mà khi video chưa load
**So that** trải nghiệm không bị giật hoặc màn hình trống

**Acceptance Criteria**

* Blurhash hiển thị trước khi thumbnail/video load
* Blurhash bị replace khi thumbnail/video sẵn sàng
* Không hiển thị màn hình đen khi loading

---

### US-04: Download image & video có progress

**As a** user
**I want** tải hình ảnh và video với tiến trình rõ ràng
**So that** tôi biết trạng thái download

**Acceptance Criteria**

* Có nút Download cho:

  * Image
  * Video
* Khi download:

  * Hiển thị progress
  * Có trạng thái: Downloading / Completed / Failed
* Cho phép:

  * Cancel download
  * Retry khi lỗi
* Thông báo khi download hoàn tất

---

## 5. Non-Functional Requirements

| Category      | Requirement                        |
| ------------- | ---------------------------------- |
| Performance   | Thumbnail & blurhash load < 500ms  |
| UX            | Grid scroll mượt khi có video      |
| Storage       | Download lưu đúng thư mục media    |
| Network       | Resume download khi mạng chập chờn |
| Compatibility | iOS / Android parity               |

---

## 6. Technical Notes (gợi ý cho dev)

* Video metadata:

  * duration
  * thumbnail_url
  * blurhash
* Player:

  * Native player (ExoPlayer / AVPlayer)
* Download:

  * Background download
  * Progress callback
* Cache:

  * Cache thumbnail
  * Optional cache video preview

---

## 7. UAT Checklist (trích yếu)

* [ ] Grid hiển thị đúng khi mix image + video
* [ ] Video play / pause ổn định
* [ ] Blurhash không flicker
* [ ] Download progress chính xác
* [ ] Cancel / retry hoạt động đúng