# Tutoring/Coaching App Template (Expo + NativeWind)

A modern, production-ready mobile app template for coaching, tutoring, or e-learning platforms, built with [Expo Router](https://expo.dev/router) and [NativeWind](https://www.nativewind.dev/). Inspired by top-tier e-learning UIs, this template is fully configurable and ready for your brand.

---

## ✨ Features
- **Configurable via a single file**: All content, branding, and links are managed in `data/config.ts`.
- **Beautiful, mobile-friendly UI**: Clean, rounded, purple-accented design with soft shadows.
- **Tab navigation**: Home, Courses, Watch, Schedule, Profile.
- **Dynamic content**: Featured course, categories, ongoing courses, and more.
- **Reusable components**: Cards, progress bars, filter chips, etc.
- **Safe area & status bar handling**: Looks great on all devices.

---

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the app**
   ```bash
   npx expo start
   ```

---

## 🗂️ Project Structure

```
app/
  (tabs)/
    index.tsx        # Home screen (dashboard)
    courses.tsx      # All courses
    watch.tsx        # Video lectures
    schedule.tsx     # Timetable/calendar
    profile.tsx      # Profile/About
    _layout.tsx      # Tab navigation layout
assets/images/       # App images, avatars, icons
components/          # Reusable UI components
constants/           # Color palette, icon mapping
 data/config.ts      # Centralized app config (edit this!)
```

---

## ⚙️ Configuration

All app content and branding is managed in `data/config.ts`:
- **Instructor info** (name, avatar, title)
- **Featured course** (title, description, image, etc.)
- **Categories**
- **Ongoing courses**
- **All courses**

**To customize:**
1. Open `data/config.ts`.
2. Replace images, names, and text with your own.
3. Add/remove courses, categories, etc. as needed.

---

## 🧩 Customization
- Add new screens by creating files in `app/(tabs)/` and updating the tab navigator in `_layout.tsx`.
- Update styles using [NativeWind](https://www.nativewind.dev/) utility classes.
- Replace images in `assets/images/` for your own branding.

---

## 📱 Screens Included
- **Home**: Dashboard with greeting, featured course, categories, ongoing courses
- **Courses**: All courses, filterable by category
- **Watch**: Video lectures grouped by topic
- **Schedule**: Class timetable/calendar
- **Profile/About**: Instructor info, stats, menu

---

## 📝 License
This template is free to use and modify for your own coaching, tutoring, or e-learning projects.
# expo-TutorMate
