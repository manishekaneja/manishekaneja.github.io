# Portfolio Website Content Management Guide

This directory contains all the content data for the portfolio website in a simplified, user-friendly format.

## 📄 File Structure

```
assets/data/
├── content.json        # Main content file (simplified format)
└── README.md          # This comprehensive guide
```

## 🏠 Website Overview

The portfolio website features a creative house metaphor with 5 floors, each representing a different section of
information. Users click on doors to view detailed content in modal popups.

### 🎯 Currently Active

The website uses **`content.json`** with a **simplified data structure** that anyone can edit without HTML knowledge!

## 🏢 Website Content Structure

### 🌳 **Header Area**

- **Left Tree**: Decorative element
- **Right Tree**: Displays your name prominently
- **Background**: Day/night theme toggle available

### 🏘️ **Main House Structure (5 Floors)**

Each floor has:

- A **clickable door** (opens content modal)
- A **window** showing preview information
- **Hover effects** and animations

## 📋 Content Sections Explained

### **Floor 1: About Me Section** 👤

**What visitors see:**

- Window preview: Name, Age, Current Status
- Modal content: Personal introduction and key points

**JSON structure:**
```json
{
  "personal": {
    "name": "Your full name (appears in tree and about section)",
    "age": 25,
    "status": "Current role/status",
    "currentYear": "Academic year or current position"
  },
  "aboutMe": {
    "title": "About Me",
    "intro": "Opening paragraph text",
    "points": [
      "Bullet point about yourself",
      "Another personal detail",
      "Professional interests"
    ]
  }
}
```

### **Floor 2: Studies Section** 🎓

**What visitors see:**

- Window preview: List of educational institutions
- Modal content: Detailed academic history with progress bars for scores

**JSON structure:**
```json
{
  "studies": {
    "title": "Academic Report",
    "intro": "Introduction to your educational background",
    "education": [
      {
        "institution": "School/College name",
        "type": "Type of education (e.g., Secondary Education)",
        "university": "University name (optional)"
      }
    ],
    "scores": [
      {
        "exam": "Exam name (10th, 12th, etc.)",
        "year": "Year of completion",
        "score": "Score percentage (creates animated progress bar)"
      }
    ]
  }
}
```

### **Floor 3: Web Skills Section** 💻

**What visitors see:**

- Window preview: List of web technologies
- Modal content: Organized categories of web development skills with color-coded lists

**JSON structure:**
```json
{
  "skills": {
    "web": {
      "title": "Web Skills",
      "intro": "Description of your web development expertise",
      "categories": {
        "frontend": {
          "title": "Front-End Development",
          "skills": ["HTML", "CSS", "JavaScript", "React"]
        },
        "libraries": {
          "title": "Libraries Used for Front-End Development",
          "skills": ["Bootstrap", "jQuery", "Angular"]
        },
        "backend": {
          "title": "Back-End Development",
          "skills": ["Node.js", "Python", "Java"]
        },
        "frameworks": {
          "title": "Frameworks Used",
          "skills": ["Express", "Django", "Spring"]
        }
      }
    }
  }
}
```

### **Floor 4: Programming Skills Section** ⚙️

**What visitors see:**

- Window preview: List of programming languages
- Modal content: Programming languages with animated proficiency bars

**JSON structure:**
```json
{
  "skills": {
    "programming": {
      "title": "Programming Skills",
      "intro": "Description of programming expertise",
      "languages": [
        {
          "name": "Language name (e.g., JavaScript)",
          "level": "Proficiency level 0-100 (creates progress bar)"
        }
      ]
    }
  }
}
```

### **Floor 5: Experience Section** 🚀

**What visitors see:**

- Window preview: "Just a Student with a Fresh Mind" message
- Modal content: List of projects with clickable links

**JSON structure:**
```json
{
  "experience": {
    "title": "Experience",
    "intro": "Introduction to your projects and work",
    "projects": [
      {
        "name": "Project name",
        "description": "Brief description (becomes link text)",
        "url": "Full project URL",
        "type": "website or repository"
      }
    ]
  }
}
```

## 🎨 Visual Elements & Interactions

### **Color Coding:**

- **Red backgrounds**: Frontend and backend skills
- **Blue backgrounds**: Libraries and frameworks
- **Progress bars**: Blue fill with percentage text

### **Interactive Features:**

- **Theme Toggle**: Day/night mode switcher (top-right)
- **Door Animations**: Doors rotate on hover
- **Modal Popups**: Detailed content appears when clicking doors
- **Window Animations**: Content slides and bounces on hover
- **Keyboard Navigation**: All elements accessible via keyboard

### **Additional UI Elements:**

#### **Guide Character** 🤖

- Green animated character on the right
- Speech bubble says "To Know More, Click on Door"
- Moves based on scroll position

#### **Contact Information** 📧

- Info button (top-right corner)
- Shows email on click: Uses `contact.email` from JSON

#### **Welcome Modal** 🎉

- Shows "WELCOME" message
- Displays "Hosted at GITHUB" with GitHub icon

## ✏️ How to Update Content

### **Quick Edits Guide:**

1. **Change your name**: Update `personal.name`
2. **Update age**: Change `personal.age`
3. **Add new skill**: Add to appropriate `skills` array
4. **Update grades**: Modify `scores` array (auto-creates progress bars)
5. **Add project**: Add to `experience.projects` array
6. **Change introduction**: Edit `aboutMe.intro` and `aboutMe.points`

### **Example: Adding a New Project**
```json
{
  "name": "My New App",
  "description": "Amazing Mobile Application",
  "url": "https://github.com/username/my-new-app",
  "type": "repository"
}
```

### **Example: Adding a Programming Language**
```json
{
  "name": "TypeScript",
  "level": "88"
}
```

## 🎯 Content Display Logic

### **Automatic Features:**

- **Name highlighting**: Your name gets special styling automatically
- **Progress bars**: Any score 0-100 becomes an animated bar
- **Link generation**: URLs automatically become clickable links with security attributes
- **Color coding**: Skills are automatically color-coded by category

### **Window Previews vs Modal Content:**

- **Window previews**: Show basic lists from JSON arrays
- **Modal content**: Shows detailed, formatted information with styling

## 📱 Responsive Design

The content automatically adapts to:

- **Desktop**: Full house view with all animations
- **Mobile**: Optimized layout (may need CSS adjustments)
- **Accessibility**: Screen reader friendly with proper ARIA labels

## 🚨 Important Notes

### **JSON Syntax Rules:**

- Use double quotes for all strings
- Separate items with commas
- Numbers don't need quotes
- Arrays use square brackets `[]`
- Objects use curly brackets `{}`

### **Content Guidelines:**

- **Progress bars**: Use numbers 0-100 only
- **URLs**: Must include `http://` or `https://`
- **Text**: No HTML needed - use plain text
- **Special characters**: Avoid quotes inside text or escape with backslash

### **File Management:**

- **Always backup** before major changes
- **Test immediately** after editing
- **Use JSON validator** if errors occur
- **Edit one section** at a time

## 🔧 Technical Details

### **How Content Loads:**

1. Website loads and fetches `content.json`
2. JavaScript processes the data
3. HTML is generated automatically
4. Styling and animations are applied
5. Interactive features are activated

### **Error Handling:**

- Fallback content shows if JSON fails to load
- Console errors help debug issues
- Website remains functional even with partial data

## 📚 Complete JSON Template

Here's the full structure with all possible fields:

```json
{
  "personal": {
    "name": "Your Full Name",
    "age": 25,
    "status": "Your Current Status",
    "currentYear": "Current Academic/Professional Year"
  },
  "aboutMe": {
    "title": "About Me",
    "intro": "Your personal introduction paragraph",
    "points": [
      "First personal highlight",
      "Second personal highlight",
      "Third personal highlight"
    ]
  },
  "studies": {
    "title": "Academic Report", 
    "intro": "Brief description of your educational journey",
    "education": [
      {
        "institution": "Institution name",
        "type": "Type of education",
        "university": "University name (if applicable)"
      }
    ],
    "scores": [
      {
        "exam": "Exam/Degree name",
        "year": "Year",
        "score": "Percentage or Grade"
      }
    ]
  },
  "skills": {
    "web": {
      "title": "Web Skills",
      "intro": "Description of your web development skills",
      "categories": {
        "frontend": {
          "title": "Front-End Development",
          "skills": ["Skill1", "Skill2", "Skill3"]
        },
        "libraries": {
          "title": "Libraries Used",
          "skills": ["Library1", "Library2"]
        },
        "backend": {
          "title": "Back-End Development", 
          "skills": ["Backend1", "Backend2"]
        },
        "frameworks": {
          "title": "Frameworks Used",
          "skills": ["Framework1", "Framework2"]
        }
      }
    },
    "programming": {
      "title": "Programming Skills",
      "intro": "Description of programming expertise",
      "languages": [
        {
          "name": "Language Name",
          "level": "Proficiency Level (0-100)"
        }
      ]
    }
  },
  "experience": {
    "title": "Experience",
    "intro": "Introduction to your projects and experience",
    "projects": [
      {
        "name": "Project Name",
        "description": "Project Description",
        "url": "https://project-url.com",
        "type": "website or repository"
      }
    ]
  },
  "contact": {
    "email": "your@email.com",
    "github": "https://github.com/yourusername"
  },
  "settings": {
    "lastUpdated": "2024",
    "version": "2.0",
    "contentFormat": "simplified"
  }
}
```

## 🎉 Result

This simplified format allows you to manage a rich, interactive portfolio website by editing just one JSON file. All the
visual styling, animations, and interactions are handled automatically while you focus on your content!

**Remember**: After any changes, save the file and refresh the website to see your updates!