# Factwise AG Grid Dashboard

A modern, fully responsive employee management dashboard built with React, TypeScript, and AG Grid. Features dynamic CRUD operations, real-time statistics, advanced filtering, and localStorage persistence.

## ✨ Features

- **Comprehensive Employee Management**
  - 100+ employee dataset with diverse global information
  - Full CRUD operations (Create, Read, Update, Delete)
  - Real-time data updates with localStorage persistence

- **Advanced Data Grid**
  - AG Grid Community integration with full functionality
  - Multi-column sorting and filtering
  - Checkbox multi-select for bulk operations
  - Custom pagination [20, 30, 50, 100] rows per page
  - 800px grid height showing 16-17 employees per view
  - Action buttons for edit/delete on each row

- **Search & Filtering**
  - Real-time search across all fields (name, country, age, salary)
  - Quick filter input with intelligent pattern matching
  - Instant results as you type

- **Statistics Dashboard**
  - Total employees count
  - Unique countries tracking
  - Average salary calculation
  - Total salary sum
  - Dynamic updates based on current data

- **Data Management**
  - Add new employees with modal form
  - Edit existing employee records inline
  - Delete employees with single click
  - Reset to default dataset
  - Export data to CSV format

- **Responsive Design**
  - Mobile-first approach (480px, 768px, full-width breakpoints)
  - Adaptive toolbar layout (vertical stack on mobile)
  - Touch-friendly buttons and controls
  - Optimized for all screen sizes

- **Type Safety**
  - Full TypeScript with strict compiler settings
  - Zero any-types for maximum safety
  - Proper interface definitions for all data

## 🛠️ Tech Stack

| Technology        | Version | Purpose                          |
| ----------------- | ------- | -------------------------------- |
| React             | 19.2.0  | UI framework                     |
| TypeScript        | 5.9.3   | Type safety                      |
| AG Grid           | 35.1.0  | Data grid component              |
| Vite              | 7.3.1   | Build tool & dev server          |
| CSS3              | Modern  | Styling with gradients & flexbox |
| Vite Plugin React | Latest  | HMR support                      |

## 📋 Project Structure

```
factwise-aggrid-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx       # Main orchestrator component
│   │   ├── GridTable.tsx       # AG Grid wrapper with pagination
│   │   ├── Toolbar.tsx         # Search and action controls
│   │   └── EmployeeForm.tsx    # Modal form for add/edit
│   ├── data/
│   │   └── employees.ts        # 100+ employee dataset
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── utils/
│   │   ├── calculations.ts     # Statistics functions
│   │   ├── storage.ts          # localStorage helpers
│   │   └── validation.ts       # Form validation
│   ├── App.tsx                 # Root component
│   ├── App.css                 # Global styling
│   ├── main.tsx                # Entry point
│   └── index.css               # Base styles
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── eslint.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ or higher
- npm 8+ or npm 10+

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/venkateshchettiar/Factwise-AG-Grid-Dashboard.git
cd factwise-aggrid-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📖 Usage

### Employee Dashboard

The dashboard displays:

- **Top Section**: 4 statistics cards showing total employees, unique countries, average salary, total salary
- **Toolbar**: Search input + Action buttons (Add Employee, Export CSV, Reset Data, Total Count)
- **Grid Area**:
  - Employee data table with 100+ records
  - Custom page size selector [20, 30, 50, 100]
  - Sorting by any column
  - Quick filtering on search input

### CRUD Operations

#### Create (Add Employee)

1. Click "**+ Add Employee**" button
2. Fill form fields:
   - Name (e.g., "John Smith")
   - Country (e.g., "USA")
   - Age (e.g., 28)
   - Salary (e.g., 50000)
3. Form validates each field
4. Click "Submit" to add
5. Data auto-saves to localStorage

#### Read (View Data)

- All 100 employees load by default (page size 100)
- Use [20, 30, 50, 100] buttons to adjust rows displayed
- Search to filter results
- Sort by clicking column headers
- Select multiple rows with checkboxes

#### Update (Edit Employee)

1. Click "**Edit**" button on any row
2. Modal opens with current data pre-filled
3. Modify any field
4. Click "Submit" to save
5. Table updates automatically
6. Changes persist in localStorage

#### Delete (Remove Employee)

1. Click "**Delete**" button on any row
2. Employee removed immediately (no confirmation)
3. Table refreshes
4. localStorage updates

### Export & Reset

#### Export CSV

- Click "**Export CSV**" button
- Downloads all current grid data as file.csv
- Includes all columns and filtered results

#### Reset Data

- Click "**Reset Data**" button
- Restores original 100 employees
- Clears all modifications
- Resets localStorage

### Search Functionality

- Type in search input: "Search by name, country, age, salary..."
- Filters live as you type
- Searches across all employee columns
- Shows matching results in real-time

## 🎨 Styling Features

### Color Scheme

- **Primary Gradient**: #667eea → #764ba2 (purple gradient)
- **Text**: #333 (dark gray)
- **Background**: White with transparency
- **Accent**: #4CAF50 (green - edit), #f44336 (red - delete)

### Responsive Breakpoints

- **Desktop**: 1400px max-width, full features
- **Tablet**: 768px, optimized spacing
- **Mobile**: 480px, vertical stacking

### Typography

- Font: 'Segoe UI', Tahoma, Geneva, Verdana
- Sizes: 2.8em (headline) → 0.85em (buttons)
- Weight: 600-700 for headers, 500 for body

## 📦 npm Scripts

```bash
# Development
npm run dev              # Start dev server with HMR

# Production
npm run build           # Compile TypeScript & bundle
npm run preview         # Preview production build locally
npm run deploy          # Deploy to GitHub Pages

# Code Quality
npm run lint            # Check ESLint rules
```

## 🔧 Configuration Files

### tsconfig.json

- Module: ES2020
- Target: ES2020
- Strict mode: Enabled
- `verbatimModuleSyntax`: true (type-only imports required)

### vite.config.ts

- React Fast Refresh enabled
- Source maps for development
- Optimized build output

### eslint.config.js

- React plugin with recommended rules
- TypeScript support
- Import sorting

## 💾 Data Persistence

### localStorage Implementation

- **Key**: `employeesData`
- **Auto-save**: On every CRUD operation
- **Auto-load**: On component mount
- **Format**: JSON stringified array
- **Size**: ~5-10KB typical

### Data Structure

```typescript
interface Employee {
  id: number;
  name: string;
  country: string;
  age: number;
  salary: number;
}
```

## 🔄 Component Hierarchy

```
App (Root)
├── Dashboard (State Manager)
│   ├── Statistics Cards (4 total)
│   ├── Toolbar
│   │   ├── Search Input
│   │   ├── + Add Employee Button
│   │   ├── Export CSV Button
│   │   ├── Reset Data Button
│   │   └── Employee Count Badge
│   ├── GridTable
│   │   ├── Table Header
│   │   │   ├── Title
│   │   │   └── Pagination Controls [20, 30, 50, 100]
│   │   └── AG Grid Component
│   │       ├── Employee Rows
│   │       ├── Edit/Delete Actions
│   │       └── Pagination Footer
│   └── EmployeeForm (Modal)
│       ├── Form Fields
│       ├── Validation Messages
│       └── Submit/Cancel Buttons
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Add employee with all fields
- [ ] Edit existing employee
- [ ] Delete employee
- [ ] Search filters results
- [ ] Sort by column
- [ ] Change page size [20, 30, 50, 100]
- [ ] Export CSV downloads
- [ ] Reset data restores defaults
- [ ] Stats update correctly
- [ ] localStorage persists data
- [ ] Mobile responsive at 480px
- [ ] Tablet responsive at 768px

## 📊 Validation Rules

### Employee Form Validation

- **Name**: Required, 2-50 characters
- **Country**: Required, 2-50 characters
- **Age**: Required, 18-75 range
- **Salary**: Required, positive number

### Error Display

- Inline error messages under fields
- Red border on invalid inputs
- Submit button disabled until valid

## 🚢 Deployment

### GitHub Pages Deployment

```bash
npm run deploy
```

Automatically deploys to GitHub Pages using gh-pages package.

### Build Output

- Optimized production bundle
- CSS minified
- JavaScript minified
- Source maps included

## 📈 Performance

- **Bundle Size**: ~233KB CSS, ~1.3MB JS (development)
- **Gzipped**: ~40KB CSS, ~375KB JS
- **Grid Height**: 800px with 16-17 visible rows
- **Render Performance**: Optimized with useMemo hooks

## 🎯 Future Enhancements

- [ ] Advanced filtering UI
- [ ] Column visibility toggle
- [ ] Bulk edit operations
- [ ] Import CSV functionality
- [ ] Date picker for age/hire date
- [ ] Salary bands visualization
- [ ] Department grouping
- [ ] Employee templates

## 📝 License

MIT License - Free to use and modify

## 👨‍💻 Author

**Venkatesh Chettiar**

- GitHub: [@venkateshchettiar](https://github.com/venkateshchettiar)
- Project: [Factwise-AG-Grid-Dashboard](https://github.com/venkateshchettiar/Factwise-AG-Grid-Dashboard)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Check existing issues for solutions
- Review component documentation in code

---

**Last Updated**: March 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
