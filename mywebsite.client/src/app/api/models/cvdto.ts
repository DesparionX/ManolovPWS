/* tslint:disable */
/* eslint-disable */
import { CertificateDto } from '../models/certificate-dto';
import { ContactDto } from '../models/contact-dto';
import { EducationDto } from '../models/education-dto';
import { LanguageDto } from '../models/language-dto';
import { SkillDto } from '../models/skill-dto';
import { WorkExperienceDto } from '../models/work-experience-dto';
export interface Cvdto {
  address?: string | null;
  birthDate?: string;
  certificates?: Array<CertificateDto> | null;
  contacts?: Array<ContactDto> | null;
  description?: string | null;
  education?: Array<EducationDto> | null;
  fullName?: string | null;
  id?: string;
  isMale?: boolean;
  languages?: Array<LanguageDto> | null;
  nationality?: string | null;
  picture?: string | null;
  profession?: string | null;
  skills?: Array<SkillDto> | null;
  workExperience?: Array<WorkExperienceDto> | null;
}
