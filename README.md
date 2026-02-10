# My Portfolio

A modern, interactive portfolio website built with Next.js, featuring a 3D tech globe powered by Three.js and React Three Fiber.

## 🚀 Features

- **Interactive 3D Globe**: Showcases tech stack with an animated wireframe globe
- **Project Showcase**: Detailed project pages with rich descriptions
- **Responsive Design**: Optimized for all devices
- **Dark Mode**: Built-in theme switching
- **Modern UI**: Built with shadcn/ui and Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.6
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: For type safety

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/samyhajar/my-portfolio.git

# Navigate to the project directory
cd my-portfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🌐 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub (already done!)
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js and configure everything
5. Click "Deploy"

## 📝 Project Structure

```
my-portfolio/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Home page
│   │   ├── layout.tsx    # Root layout
│   │   └── projects/     # Project pages
│   ├── components/       # React components
│   │   ├── sections/     # Page sections
│   │   └── ui/           # UI components
│   ├── data/            # Project data
│   └── lib/             # Utilities and configs
├── public/              # Static assets
└── package.json         # Dependencies
```

## 🎨 Customization

- **Projects**: Edit `src/data/projects.ts` to add/modify projects
- **Tech Stack**: Update the globe icons in `src/components/ui/tech-globe.tsx`
- **Styling**: Modify `src/app/globals.css` for global styles
- **Theme**: Customize colors in `tailwind.config.ts`

## 📄 License

MIT License - feel free to use this portfolio as a template for your own!

## 🔗 Links

- **Live Demo**: Coming soon on Vercel
- **GitHub**: [samyhajar/my-portfolio](https://github.com/samyhajar/my-portfolio)
