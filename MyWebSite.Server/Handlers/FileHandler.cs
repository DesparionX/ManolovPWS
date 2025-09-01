using System.Diagnostics;

namespace MyWebSite.Server.Handlers
{
    public class FileHandler
    {
        private readonly IWebHostEnvironment _env;
        private readonly string? _volumeMount = Environment.GetEnvironmentVariable("RAILWAY_VOLUME_MOUNT_PATH");
        private string? _volumePath;

        public FileHandler(IWebHostEnvironment env)
        {
            _env = env;
            CreateVolumeDirectory();
        }

        public async Task<List<string>> ConvertFromBase64(List<string>? picturesInDb, List<string> rawPictures, CancellationToken cancellationToken = default)
        {
            if (picturesInDb is null || picturesInDb.Count == 0)
                return [];

            try
            {
                foreach (var picture in rawPictures)
                {
                    var fileName = await ConvertFromBase64(picture, cancellationToken);
                    picturesInDb.Add(fileName!);
                }
                return picturesInDb;
            }
            catch (Exception err)
            {
                Debug.WriteLine($"Error: {err.Message}");
                throw;
            }
        }
        public async Task<string?> ConvertFromBase64(string? rawPicture, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(rawPicture))
                return null;

            try
            {
                var savePath = VolumeExist() ?
                    Path.Combine(_volumePath!)
                    : Path.Combine(_env.ContentRootPath, "Resources", "Images");

                var fileName = Guid.NewGuid() + ".png";
                var fullPath = Path.Combine(savePath, fileName);

                var rawPic = rawPicture.Substring(rawPicture.IndexOf(",") + 1);
                var imageBytes = Convert.FromBase64String(rawPic);

                await File.WriteAllBytesAsync(fullPath, imageBytes, cancellationToken);

                return fileName;
            }
            catch (Exception err)
            {
                Debug.WriteLine($"Error: {err.Message}");
                throw;
            }
        }

        public async Task<List<string>> ConvertToBase64(List<string>? pictures, CancellationToken cancellationToken = default)
        {
            if (pictures is null || pictures.Count == 0)
                return [];

            var convertedPictures = new List<string>();
            try
            {
                foreach (var picture in pictures)
                {
                    var fileName = await ConvertToBase64(picture, cancellationToken);
                    convertedPictures.Add(fileName!);
                }

                return convertedPictures;
            }
            catch (Exception err)
            {
                Debug.WriteLine($"Error: {err.Message}");
                throw;
            }
        }
        public async Task<string?> ConvertToBase64(string? picture, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(picture))
                return null;

            try
            {
                var volumePath = VolumeExist() 
                    ? Path.Combine(_volumePath!, picture) : string.Empty;

                var fullPath = File.Exists(volumePath) ?
                    volumePath : Path.Combine(_env.ContentRootPath, picture);

                if (!File.Exists(fullPath))
                    return null;

                var bytes = await File.ReadAllBytesAsync(fullPath, cancellationToken);
                var base64picture = Convert.ToBase64String(bytes);
                var prefix = "data:image/png;base64,";
                var convertedPicture = prefix + base64picture;

                return convertedPicture;
            }
            catch (Exception err)
            {
                Debug.WriteLine($"Error: {err.Message}");
                throw;
            }
        }

        private bool VolumeExist()
        {
            return !string.IsNullOrWhiteSpace(_volumeMount);
        }

        private void CreateVolumeDirectory()
        {
            if (VolumeExist())
            {
                _volumePath = Path.Combine(_volumeMount!, "Images");
                Directory.CreateDirectory(_volumePath);
            }
        }
    }
}
