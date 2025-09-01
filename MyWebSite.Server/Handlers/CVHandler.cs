using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyWebSite.Server.Data;
using MyWebSite.Server.Data.DTOs;
using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Data.Interfaces;
using MyWebSite.Server.Http.Responses;

namespace MyWebSite.Server.Handlers
{
    public class CVHandler
    {
        private readonly ApplicationDbContext _context;
        private readonly FileHandler _fileHandler;
        private readonly IMapper _mapper;

        public CVHandler(ApplicationDbContext context, FileHandler fileHandler, IMapper mapper)
        {
            _context = context;
            _fileHandler = fileHandler;
            _mapper = mapper;
        }
        public async Task<InitializeCVResult> SeedCVAsync()
        {
            var cv = new CV
            {
                Id = Guid.NewGuid(),
                Picture = string.Empty,
                FullName = string.Empty,
                IsMale = true,
                Nationality = string.Empty,
                BirthDate = DateTime.Now,
                Address = string.Empty,
                Profession = string.Empty,
                Description = string.Empty,
                Contacts = new List<Contact>(),
                Skills = new List<Skill>(),
                WorkExperience = new List<WorkExperience>(),
                Education = new List<Education>(),
                Languages = new List<Language>(),
                Certificates = new List<Certificate>(),
            };
            try
            {
                _context.Add(cv);
                var added = await _context.SaveChangesAsync();
                if (added > 0)
                {
                    return new InitializeCVResult { Succeed = true, Message = "CV added succesfully. ", CV = cv };
                }
                return new InitializeCVResult { Succeed = false, Message = "Something went wrong. " };
            }
            catch (Exception err)
            {
                return new InitializeCVResult { Succeed = false, Message = err.Message };
            }
        }

        public async Task<LoadCVResponse> LoadCVAsync()
        {
            try
            {
                var cv = await _context.CVs.AsNoTracking()
                    .Include(c => c.Contacts).AsNoTracking()
                    .Include(c => c.WorkExperience).AsNoTracking()
                    .Include(c => c.Education).AsNoTracking()
                    .Include(c => c.Skills).AsNoTracking()
                    .Include(c => c.Languages).AsNoTracking()
                    .Include(c => c.Certificates).AsNoTracking()
                    .SingleOrDefaultAsync();

                if (cv == null)
                    return new LoadCVResponse { Succeed = false, Message = "No CV found !" };

                var cvDTO = _mapper.Map<CVDTO>(cv);
                cvDTO.Picture = await _fileHandler.ConvertToBase64(cvDTO.Picture);

                return new LoadCVResponse { Succeed = true, Message = "CV found !", CV = cvDTO };
            }
            catch (Exception err)
            {
                return new LoadCVResponse { Succeed = false, Message = err.Message };
            }
        }

        public async Task<UpdateCVResponse> UpdateCVAsync(CVDTO cvDTO)
        {
            if (cvDTO == null)
                return new UpdateCVResponse { Succeed = false, Message = "CV is null !" };

            try
            {
                var cvFromDB = await _context.CVs
                    .Where(c => c.Id == cvDTO.Id)
                    .Include(c => c.Contacts)
                    .Include(c => c.WorkExperience)
                    .Include(c => c.Education)
                    .Include(c => c.Skills)
                    .Include(c => c.Languages)
                    .Include(c => c.Certificates)
                    .SingleOrDefaultAsync();
                if (cvFromDB == null)
                    return new UpdateCVResponse { Succeed = false, Message = "Can't find CV with given ID." };

                cvDTO.Picture = await _fileHandler.ConvertFromBase64(cvDTO.Picture);
                _mapper.Map(cvDTO, cvFromDB);


                // Update Contacts collection.
                var dtoContacts = new List<Contact>();
                foreach (var contact in cvDTO.Contacts!)
                {
                    dtoContacts.Add(_mapper.Map<Contact>(contact));
                }
                SyncCollection(cvFromDB.Contacts!, dtoContacts);

                // Update Work experience collection.
                var dtoWorkExperience = new List<WorkExperience>();
                foreach (var job in cvDTO.WorkExperience!)
                {
                    dtoWorkExperience.Add(_mapper.Map<WorkExperience>(job));
                }
                SyncCollection(cvFromDB.WorkExperience!, dtoWorkExperience);

                // Update education list.
                var dtoEducation = new List<Education>();
                foreach (var edu in cvDTO.Education!)
                {
                    dtoEducation.Add(_mapper.Map<Education>(edu));
                }
                SyncCollection(cvFromDB.Education!, dtoEducation);

                // Update skills collection.
                var dtoSkills = new List<Skill>();
                foreach (var skill in cvDTO.Skills!)
                {
                    dtoSkills.Add(_mapper.Map<Skill>(skill));
                }
                SyncCollection(cvFromDB.Skills!, dtoSkills);

                // Update languages collection.
                var dtoLanguages = new List<Language>();
                foreach (var language in cvDTO.Languages!)
                {
                    dtoLanguages.Add(_mapper.Map<Language>(language));
                }
                SyncCollection(cvFromDB.Languages!, dtoLanguages);

                // Update certificates collection.
                var dtoCertificates = new List<Certificate>();
                foreach (var certi in cvDTO.Certificates!)
                {
                    dtoCertificates.Add(_mapper.Map<Certificate>(certi));
                }
                SyncCollection(cvFromDB.Certificates!, dtoCertificates);


                _context.CVs.Update(cvFromDB);

                var res = await _context.SaveChangesAsync();
                if (res > 0)
                    return new UpdateCVResponse { Succeed = true, Message = "CV updated succesfully.", CV = cvDTO };

                return new UpdateCVResponse { Succeed = false, Message = "Something went wrong while saving the changes." };
            }
            catch (Exception err)
            {
                return new UpdateCVResponse { Succeed = false, Message = err.Message };
            }

        }
        private void SyncCollection<T>(ICollection<T> dbCollection, ICollection<T> dtoCollection) where T : class, IEntity
        {

            var itemsToRemove = dbCollection.Where(dbItem =>
                !dtoCollection.Any(dtoItem => dtoItem.Id == dbItem.Id)).ToList();
            foreach (var item in itemsToRemove)
            {
                dbCollection.Remove(item);
            }

            var itemsToAdd = dtoCollection.Where(dtoItem =>
                !dbCollection.Any(dbItem => dbItem.Id == dtoItem.Id)).ToList();
            foreach (var item in itemsToAdd)
            {
                dbCollection.Add(item);
            }
        }
    }
}
