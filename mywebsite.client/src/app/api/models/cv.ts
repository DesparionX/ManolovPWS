/* tslint:disable */
/* eslint-disable */
import { Certificate } from '../models/certificate';
import { Contact } from '../models/contact';
import { Education } from '../models/education';
import { Language } from '../models/language';
import { Skill } from '../models/skill';
import { WorkExperience } from '../models/work-experience';
export interface Cv {
  address?: string | null;
  birthDate?: string;
  certificates?: Array<Certificate> | null;
  contacts?: Array<Contact> | null;
  description?: string | null;
  education?: Array<Education> | null;
  fullName?: string | null;
  id?: string;
  isMale?: boolean;
  languages?: Array<Language> | null;
  nationality?: string | null;
  picture?: string | null;
  profession?: string | null;
  skills?: Array<Skill> | null;
  workExperience?: Array<WorkExperience> | null;
}
