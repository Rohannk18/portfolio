import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, ListFlowable, ListItem, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT

def create_resume_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=28,
        bottomMargin=28
    )

    story = []
    styles = getSampleStyleSheet()

    # Custom styles
    header_name_style = ParagraphStyle(
        'HeaderName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#0f172a')
    )

    contact_style = ParagraphStyle(
        'ContactLine',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#334155')
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=6,
        spaceAfter=2,
        textTransform='uppercase'
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#1e293b'),
        alignment=TA_JUSTIFY
    )

    bold_body_style = ParagraphStyle(
        'BoldBody',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#0f172a')
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=10.5,
        textColor=colors.HexColor('#1e293b')
    )

    # 1. Header
    story.append(Paragraph("ROHAN M NAIK", header_name_style))
    story.append(Spacer(1, 3))
    
    contact_text = (
        '<font color="#0f172a"><b>rohannaik8@gmail.com</b></font> | '
        '+91 8073107840 | Bengaluru, India | '
        '<a href="https://www.linkedin.com/in/rohan-naik-785033353/" color="#0284c7"><u>LinkedIn</u></a> | '
        '<a href="https://github.com/Rohannk18" color="#0284c7"><u>GitHub</u></a>'
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#0f172a'), spaceBefore=1, spaceAfter=4))

    # Helper function for section line
    def add_section_header(title):
        story.append(Paragraph(title, section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cbd5e1'), spaceBefore=1, spaceAfter=4))

    # 2. Summary
    add_section_header("SUMMARY")
    summary_p = (
        "Computer Science Engineering graduate (B.E. / B.Tech, 2026) with hands-on experience in full-stack software "
        "development and building end-to-end web applications. Proficient in Java, Python, JavaScript, TypeScript, React.js, "
        "Node.js, Express.js, REST APIs, and database technologies. Experienced in developing ERP and e-commerce applications "
        "with authentication, role-based access control (RBAC), database transactions, and interconnected business workflows. "
        "Strong foundation in Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, and "
        "Computer Networks, with a focus on building scalable and reliable software solutions."
    )
    story.append(Paragraph(summary_p, body_style))
    story.append(Spacer(1, 4))

    # 3. Experience
    add_section_header("EXPERIENCE")

    # Exp 1: Sixorbit ERP
    exp1_header = [
        [
            Paragraph("<b>Business Development Associate — Sixorbit ERP</b> (Accrete Globus Technology)", bold_body_style),
            Paragraph("<font color='#475569'><b>Mar 2026 – Present</b></font>", ParagraphStyle('R1', parent=bold_body_style, alignment=TA_RIGHT))
        ]
    ]
    t1 = Table(exp1_header, colWidths=[420, 120])
    t1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t1)

    exp1_bullets = [
        "Conducted product demonstrations of Sixorbit ERP's CRM, inventory, stock management, and accounting modules for manufacturers, retailers, and distributors, translating software functionality into business requirements.",
        "Analyzed client requirements and workflows to understand software needs across CRM, inventory, accounting, and operational processes, communicating functional requirements to internal teams.",
        "Worked with ERP and CRM platforms to manage prospect information, track business workflows, document requirements, and maintain structured client records throughout the engagement lifecycle.",
        "Collaborated with cross-functional teams during client onboarding and implementation activities, helping align software workflows with customer business processes and supporting system adoption.",
        "Prepared performance and process reports using operational data to identify workflow trends, track process efficiency, and communicate actionable insights to stakeholders."
    ]
    for b in exp1_bullets:
        story.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        story.append(Spacer(1, 1.5))
    story.append(Spacer(1, 3))

    # Exp 2: Edutainer
    exp2_header = [
        [
            Paragraph("<b>Software Development Intern — Edutainer</b> (PAT Technologies Private Limited)", bold_body_style),
            Paragraph("<font color='#475569'><b>Feb 2026 – May 2026</b></font>", ParagraphStyle('R2', parent=bold_body_style, alignment=TA_RIGHT))
        ]
    ]
    t2 = Table(exp2_header, colWidths=[420, 120])
    t2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t2)

    exp2_bullets = [
        "Completed a 3-month software development internship focused on application development, programming, debugging, and problem-solving.",
        "Worked with React.js to develop and enhance frontend components, applying modern web development practices to real-world application tasks.",
        "Applied Python programming and logical problem-solving techniques while working on coding, debugging, and application development exercises.",
        "Gained practical exposure to software development workflows along with foundational concepts in cybersecurity, ethical hacking, and risk assessment."
    ]
    for b in exp2_bullets:
        story.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        story.append(Spacer(1, 1.5))
    story.append(Spacer(1, 4))

    # 4. Projects
    add_section_header("PROJECTS")

    # Project 1: E-Commerce
    proj1_header = [
        [
            Paragraph("<b>E-Commerce Platform</b> — Full-Stack E-Commerce Application | <a href='https://github.com/Rohannk18/E-Commerce' color='#0284c7'><u>Live</u></a> | <a href='https://github.com/Rohannk18/E-Commerce' color='#0284c7'><u>GitHub</u></a>", bold_body_style),
            Paragraph("<font color='#475569'><b>August 2026</b></font>", ParagraphStyle('RP1', parent=bold_body_style, alignment=TA_RIGHT))
        ]
    ]
    tp1 = Table(proj1_header, colWidths=[420, 120])
    tp1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(tp1)
    story.append(Paragraph("<i>React.js · Node.js · Express.js · MongoDB · REST APIs</i>", ParagraphStyle('Tech1', parent=body_style, fontSize=8, textColor=colors.HexColor('#475569'))))
    story.append(Spacer(1, 1.5))

    p1_bullets = [
        "Built a full-stack e-commerce platform with end-to-end user, product, cart, inventory, and order workflows, integrating React-based frontend components with RESTful backend APIs.",
        "Implemented secure authentication and role-based authorization to separate customer and administrative operations.",
        "Designed product, inventory, and order workflows to maintain structured data flow across multiple interconnected business operations."
    ]
    for b in p1_bullets:
        story.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        story.append(Spacer(1, 1.5))
    story.append(Spacer(1, 3))

    # Project 2: ERP System
    proj2_header = [
        [
            Paragraph("<b>ERP System</b> — Enterprise Resource Planning Application | <a href='https://github.com/Rohannk18/ERP' color='#0284c7'><u>Live</u></a> | <a href='https://github.com/Rohannk18/ERP' color='#0284c7'><u>GitHub</u></a>", bold_body_style),
            Paragraph("<font color='#475569'><b>August 2026</b></font>", ParagraphStyle('RP2', parent=bold_body_style, alignment=TA_RIGHT))
        ]
    ]
    tp2 = Table(proj2_header, colWidths=[420, 120])
    tp2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(tp2)
    story.append(Paragraph("<i>React.js · Node.js · Express.js · MongoDB · REST APIs</i>", ParagraphStyle('Tech2', parent=body_style, fontSize=8, textColor=colors.HexColor('#475569'))))
    story.append(Spacer(1, 1.5))

    p2_bullets = [
        "Developed a centralized ERP platform integrating quotations, inventory, orders, and operational workflows into a single application.",
        "Designed role-based workflows across multiple business functions, improving visibility and coordination of interconnected processes.",
        "Structured the application around end-to-end process flows, reducing reliance on disconnected manual tracking systems."
    ]
    for b in p2_bullets:
        story.append(Paragraph(f"• &nbsp; {b}", bullet_style))
        story.append(Spacer(1, 1.5))
    story.append(Spacer(1, 4))

    # 5. Education
    add_section_header("EDUCATION")
    edu_header = [
        [
            Paragraph("<b>B.Tech in Computer Science & Engineering</b>", bold_body_style),
            Paragraph("<font color='#475569'><b>2022 – 2026</b></font>", ParagraphStyle('RE1', parent=bold_body_style, alignment=TA_RIGHT))
        ],
        [
            Paragraph("Sapthagiri College of Engineering, Bengaluru", body_style),
            Paragraph("<b>CGPA: 8.6 / 10</b>", ParagraphStyle('RE2', parent=bold_body_style, alignment=TA_RIGHT, textColor=colors.HexColor('#0f172a')))
        ]
    ]
    te = Table(edu_header, colWidths=[420, 120])
    te.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(te)
    story.append(Spacer(1, 4))

    # 6. Technical Skills
    add_section_header("TECHNICAL SKILLS")
    skills = [
        ("Languages", "Java, JavaScript, TypeScript, Python, SQL"),
        ("Frontend", "React.js, HTML5, CSS3, Tailwind CSS, React Router, Responsive Design"),
        ("Backend", "Node.js, Express.js, REST APIs, MVC Architecture"),
        ("Database", "MongoDB, PostgreSQL, SQLite, Prisma ORM, Database Schema Design"),
        ("Authentication & Security", "JWT Authentication, Role-Based Access Control (RBAC), HTTP-only Cookies, Bcrypt"),
        ("Development", "CRUD Operations, API Development, Database Transactions, Debugging, Problem Solving"),
        ("Tools", "Git, GitHub, Vite, Vercel, Netlify")
    ]
    skill_rows = []
    for label, items in skills:
        skill_rows.append([
            Paragraph(f"<b>{label}:</b>", ParagraphStyle('SKL', parent=bold_body_style, fontSize=8.2, leading=10.5)),
            Paragraph(items, ParagraphStyle('SKV', parent=body_style, fontSize=8.2, leading=10.5))
        ])
    ts = Table(skill_rows, colWidths=[130, 410])
    ts.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
    ]))
    story.append(ts)
    story.append(Spacer(1, 4))

    # 7. Achievements & Certifications
    add_section_header("ACHIEVEMENTS & CERTIFICATIONS")
    cert_text = (
        "<b>Certifications:</b> CyberOps Associate · Introduction to Modern AI · Apply AI: Analyze Customer Reviews · "
        "JavaScript · HTML5 – The Language · CSS3 · Networking and Web Technology"
    )
    story.append(Paragraph(cert_text, bullet_style))

    doc.build(story)
    print(f"Successfully generated resume at {output_path}")

if __name__ == '__main__':
    target = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public', 'resume.pdf'))
    create_resume_pdf(target)
