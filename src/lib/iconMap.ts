import {
  Code,
  Layers,
  Database,
  Cloud,
  Wrench,
  Zap,
  Code2,
  Trophy,
  Rocket,
  Award,
  Mail,
  FileText,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Briefcase,
  Calendar,
  GraduationCap,
  LucideIcon,
  Brain
} from 'lucide-react';

// Map icon strings to Lucide React components
const iconMap: Record<string, LucideIcon> = {
  Code,
  Layers,
  Database,
  Cloud,
  Wrench,
  Zap,
  FileText,
  Code2,
  Trophy,
  Rocket,
  Award,
  Mail,
  Phone,
  MapPin,
  Brain,
  Github,
  Linkedin,
  Briefcase,
  Calendar,
  GraduationCap
};

/**
 * Get Lucide icon component from string name
 * @param iconName - String name of the icon (e.g., "Code", "Database")
 * @returns Lucide icon component or Code as fallback
 */
export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Code;
}

export { iconMap };
