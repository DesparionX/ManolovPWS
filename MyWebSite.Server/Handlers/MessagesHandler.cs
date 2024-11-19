using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyWebSite.Server.Data;
using MyWebSite.Server.Data.DTOs;
using MyWebSite.Server.Data.Entities;
using MyWebSite.Server.Http.Responses;

namespace MyWebSite.Server.Handlers
{
    public class MessagesHandler
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public MessagesHandler(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<SendMessageResponse> SendMessageAsync(HttpContext httpContext, MessageDTO dto)
        {
            var senderIp = GetSenderIp(httpContext);
            var senderDevice = GetSenderDevice(httpContext);

            if (string.IsNullOrWhiteSpace(senderIp))
                return new SendMessageResponse { Succeed = false, Message = "Couldn't get sender IP." };

            if (string.IsNullOrWhiteSpace(senderDevice))
                return new SendMessageResponse { Succeed = false, Message = "Couldn't get sender Device." };

            dto.SenderIp = senderIp;
            dto.SenderDevice = senderDevice;

            var check = await CanSendMessageAsync(dto);

            if (check.Succeed && (check.Can == false)) 
            {
                return new SendMessageResponse { Succeed = true, HasPenalty = true, Message = check.Message! };
                // I did it this way because if succeed is set to 'false' angular doesnt know if its a message penalty or server error.
                // And I dont really want to make another api call to check for penalty before calling the send message method.
            }

            try
            {
                var message = _mapper.Map(dto, new Message());
                _context.Add(message);

                var res = await _context.SaveChangesAsync();
                if (res > 0)
                {
                    return new SendMessageResponse { Succeed = true, Message = "Message sent successfully ! \nYou need to wait 5 mins before sending another one."};
                }
                return new SendMessageResponse { Succeed = false, Message = "Something wen't wrong !" };
            }
            catch (Exception err)
            {
                return new SendMessageResponse { Succeed = false, Message = err.Message };
            }
        }

        public async Task<GetMessagesResponse> GetAllMessagesAsync()
        {
            try
            {
                var messagesList = await _context.Messages.OrderByDescending(m => m.DateSent).ToListAsync();
                if (messagesList != null && messagesList.Count > 0)
                {
                    var dtoList = new List<MessageDTO>();
                    foreach (var message in messagesList)
                    {
                        dtoList.Add(_mapper.Map<MessageDTO>(message));
                    }
                    return new GetMessagesResponse { Succeed = true, Message = "Succesfully retrieved all messages.", MessagesList = dtoList };
                }

                return new GetMessagesResponse { Succeed = false, Message = "There are no messages in the DB." };
            }
            catch (Exception err)
            {
                return new GetMessagesResponse { Succeed = false, Message = err.Message };
            }
        }
        public async Task<ReadMessageResponse> ReadMessageAsync(Guid id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
                return new ReadMessageResponse { Succeed = false, Message = "The ID is empty." };

            try
            {
                var message = await _context.Messages.Where(m => m.Id.Equals(id)).AsNoTracking().SingleOrDefaultAsync();
                if (message != null)
                    return new ReadMessageResponse { Succeed = true, Message = "Found it !", DTO = _mapper.Map<MessageDTO>(message) };

                return new ReadMessageResponse { Succeed = false, Message = "Couldn't find message with given ID." };
            }
            catch (Exception err)
            {
                return new ReadMessageResponse { Succeed = false, Message = err.Message };
            }
        }
        public async Task<DeleteMessageResponse> DeleteMessageAsync(Guid id)
        {
            if (string.IsNullOrWhiteSpace(id.ToString()))
                return new DeleteMessageResponse { Succeed = false, Message = "ID is null or empty." };
            try
            {
                var message = await _context.Messages.Where(m => m.Id.Equals(id)).SingleOrDefaultAsync();
                if (message == null)
                    return new DeleteMessageResponse { Succeed = false, Message = "No message found with the given ID." };

                _context.Messages.Remove(message);
                var res = await _context.SaveChangesAsync();

                if (res > 0)
                    return new DeleteMessageResponse { Succeed = true, Message = "Successfully deleted the message." };

                return new DeleteMessageResponse { Succeed = false, Message = "Something went wrong while trying to save the changes." };
            }
            catch (Exception err)
            {
                return new DeleteMessageResponse { Succeed = false, Message = err.Message };
            }
        }
        private string GetSenderIp(HttpContext httpContext)
        {
            // Check if sender is using proxy and return the real ip.

            var ip = httpContext.Request.Headers["X-Forwarded-For"].FirstOrDefault();

            return !string.IsNullOrWhiteSpace(ip) ? ip : httpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown IP";
        }

        private string GetSenderDevice(HttpContext httpContext)
        {
            return httpContext.Request.Headers["User-Agent"].ToString();
        }

        private async Task<CanSendMessageResponse> CanSendMessageAsync(MessageDTO dto)
        {
            try
            {
                var messageFromDb = await _context.Messages.Where(m =>
                m.SenderIp == dto.SenderIp &&
                m.SenderDevice == dto.SenderDevice)
                    .OrderByDescending(m => m.DateSent)
                    .FirstOrDefaultAsync();

                if (messageFromDb == null)
                    return new CanSendMessageResponse { Succeed = true, Can = true };

                if (dto.DateSent - messageFromDb.DateSent < TimeSpan.FromMinutes(5))
                    return new CanSendMessageResponse { Succeed = true, Can = false, Message = "You must wait 5 minutes before send another message." };

                return new CanSendMessageResponse { Can = true };
            }
            catch (Exception err)
            {
                return new CanSendMessageResponse {Succeed = false, Can = false, Message = err.Message };
            }
        }
    }
}
