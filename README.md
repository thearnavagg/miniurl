# MiniUrl 🔗

MiniUrl is a powerful tool for creating custom short links with integrated QR code generation, making sharing more accessible and efficient. With its robust dashboard and detailed analytics, you can track link performance effortlessly.

## ✨ Features

- **Smooth QR Code Generation**: Effortlessly generate QR codes via a user-friendly interface.
- **Comprehensive Dashboard**: Manage all your links in one place, track total link counts, and analyze detailed performance metrics.
- **Custom URL Creation**: Personalize your URLs for brand recognition and memorability.
- **Detailed Link Analytics**: Gain insights into each link's performance, including device types and geographic locations of clicks.
- **Responsive Design**: Experience seamless performance across all devices, including desktops, tablets, and mobile phones.
- **Light and Dark Mode Toggle**: Choose between light and dark themes for a customized viewing experience.

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Supabase
- **Build Tool**: Vite

## 🚀 Getting Started

### 💻 Run Locally

This project uses [Vite](https://vitejs.dev/) as its build tool. Follow these steps to run MiniUrl on your local machine:

1. Clone the repository:

    ```bash
    git clone https://github.com/thearnavagg/miniurl.git
    ```

2. Navigate to the project directory:

    ```bash
    cd miniurl
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

4. Start the Vite development server:

    ```bash
    npm run dev
    ```



### 🌐 Environment Variables

To run this project, add the following environment variables to your `.env` file:

- `VITE_SUPABASE_URL`: The URL of your Supabase project to connect your app to the backend.
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous public API key for secure interaction with the database.
- `VITE_URL_LINK`: Your localhost or domain URL for website targeting and display.

## 🔮 Future Plans
- Add user authentication with OAuth providers
- Improve link expiration feature

## 🙏 Acknowledgements

This project wouldn't have been possible without the following amazing open-source libraries and tools:

- [Supabase](https://supabase.io/) - An open-source backend as a service that provides a complete backend system.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for creating highly customizable and responsive designs.
- [ShadCNUI](https://ui.shadcn.com/) - A set of accessible, minimalistic, customizable components for building user interfaces.
- [react-qrcode-logo](https://github.com/gcoro/react-qrcode-logo) - A React component for generating customizable QR codes.
- [recharts](https://recharts.org/en-US/) - A charting library built with React and D3.
- [ua-parser-js](https://github.com/faisalman/ua-parser-js) - A library for parsing browser user-agent strings.
- [react-icons](https://react-icons.github.io/react-icons/) - Popular icons as React components.
- [Lottie-web](https://airbnb.io/lottie/#/) - A library for rendering animations on the web.
- [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression) - A client-side JavaScript image compression library.
