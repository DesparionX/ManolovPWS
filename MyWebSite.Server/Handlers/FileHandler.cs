﻿namespace MyWebSite.Server.Handlers
{
    public class FileHandler
    {
        public async Task<List<string>> ConvertFromBase64(List<string>? picturesInDb, List<string> rawPictures)
        {
            if (picturesInDb == null)
                picturesInDb = new List<string>();

            if (rawPictures != null && rawPictures.Count > 0)
            {
                try
                {
                    var folderName = Path.Combine("Resources", "Images");
                    var savePath = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                    foreach (var picture in rawPictures)
                    {
                        var fileName = Guid.NewGuid() + ".png";
                        var fullPath = Path.Combine(savePath, fileName);
                        var dbPath = Path.Combine(folderName, fileName);

                        var rawPicture = picture.Substring(picture.IndexOf(",") + 1);
                        var imageBytes = Convert.FromBase64String(rawPicture);

                        await File.WriteAllBytesAsync(fullPath, imageBytes);

                        picturesInDb.Add(dbPath);
                    }
                    return picturesInDb;
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                }
            }
            return picturesInDb;
        }
        public async Task<string> ConvertFromBase64(string rawPicture)
        {
            if (!string.IsNullOrWhiteSpace(rawPicture))
            {
                try
                {
                    var folderName = Path.Combine("Resources", "Images");
                    var savePath = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                    var fileName = Guid.NewGuid() + ".png";
                    var fullPath = Path.Combine(savePath, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    var rawPic = rawPicture.Substring(rawPicture.IndexOf(",") + 1);
                    var imageBytes = Convert.FromBase64String(rawPic);

                    await File.WriteAllBytesAsync(fullPath, imageBytes);

                    return dbPath;
                }
                catch (Exception err)
                {
                    Console.WriteLine(err.Message);
                    return err.Message;
                }
            }
            return rawPicture;
        }

        public async Task<List<string>> ConvertToBase64(List<string> pictures)
        {
            if (pictures.Count == 0)
                return new List<string>();

            var convertedPictures = new List<string>();
            if (pictures != null && pictures.Count > 0)
            {
                foreach (var picture in pictures)
                {
                    var bytes = await File.ReadAllBytesAsync(picture);
                    var base64picture = Convert.ToBase64String(bytes);
                    var prefix = "data:image/png;base64,";
                    var convertedPicture = prefix + base64picture;
                    convertedPictures.Add(convertedPicture);
                }
            }
            return convertedPictures;
        }
        public async Task<string> ConverToBase64(string picture)
        {
            if (!string.IsNullOrWhiteSpace(picture))
            {
                var bytes = await File.ReadAllBytesAsync(picture);
                var base64picture = Convert.ToBase64String(bytes);
                var prefix = "data:image/png;base64,";
                var convertedPicture = prefix + base64picture;

                return convertedPicture;
            }
            return "Something went wrong while converting the picture.";
        }
    }
}
