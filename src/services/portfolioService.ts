import { collection, doc, getDoc, getDocs, query, orderBy, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  Profile,
  Experience,
  Project,
  SkillCategory,
  Education,
  Achievement,
  Contact
} from '@/types/portfolio';

const COLLECTION_PATH = 'portfolio/data';

/**
 * Fetch profile data
 */
export async function getProfile(): Promise<Profile | null> {
  try {
    const docRef = doc(db, 'portfolio', 'profile');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as Profile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

/**
 * Fetch all experiences ordered by order field
 */
export async function getExperiences(): Promise<Experience[]> {
  try {
    const q = query(
      collection(db, `${COLLECTION_PATH}/experiences`),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((docSnap) => ({
      ...(docSnap.data() as DocumentData),
      id: docSnap.id
    } as unknown)) as Experience[];
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

/**
 * Fetch all projects ordered by order field
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(
      collection(db, `${COLLECTION_PATH}/projects`),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((docSnap) => ({
      ...(docSnap.data() as DocumentData),
      id: docSnap.id
    } as unknown)) as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

/**
 * Fetch all skill categories ordered by order field
 */
export async function getSkills(): Promise<SkillCategory[]> {
  try {
    const q = query(
      collection(db, `${COLLECTION_PATH}/skills`),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((docSnap) => ({
      ...(docSnap.data() as DocumentData),
      id: docSnap.id
    } as unknown)) as SkillCategory[];
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

/**
 * Fetch all education entries ordered by order field
 */
export async function getEducation(): Promise<Education[]> {
  try {
    const q = query(
      collection(db, `${COLLECTION_PATH}/education`),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((docSnap) => ({
      ...(docSnap.data() as DocumentData),
      id: docSnap.id
    } as unknown)) as Education[];
  } catch (error) {
    console.error('Error fetching education:', error);
    return [];
  }
}

/**
 * Fetch all achievements ordered by order field
 */
export async function getAchievements(): Promise<Achievement[]> {
  try {
    const q = query(
      collection(db, `${COLLECTION_PATH}/achievements`),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((docSnap) => ({
      ...(docSnap.data() as DocumentData),
      id: docSnap.id
    } as unknown)) as Achievement[];
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}

/**
 * Fetch contact information
 */
export async function getContact(): Promise<Contact | null> {
  try {
    const docRef = doc(db, 'portfolio', 'contact');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as Contact;
    }
    return null;
  } catch (error) {
    console.error('Error fetching contact:', error);
    return null;
  }
}

/**
 * Fetch all portfolio data at once
 */
export async function getAllPortfolioData() {
  const [
    profile,
    experiences,
    projects,
    skills,
    education,
    achievements,
    contact
  ] = await Promise.all([
    getProfile(),
    getExperiences(),
    getProjects(),
    getSkills(),
    getEducation(),
    getAchievements(),
    getContact()
  ]);
  return {
    profile,
    experiences,
    projects,
    skills,
    education,
    achievements,
    contact
  };
}
