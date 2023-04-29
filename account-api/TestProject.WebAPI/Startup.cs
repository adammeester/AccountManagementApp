using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TestProject.WebAPI.Data.MappingProfiles;
using TestProject.WebAPI.Data.Repository;
using TestProject.WebAPI.Data.Repository.Interface;
using TestProject.WebAPI.Repository;
using TestProject.WebAPI.SeedData;
using TestProject.WebAPI.Services;
using TestProject.WebAPI.Services.Interface;

namespace TestProject.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging();
            services.AddControllers();
            services.AddDbContext<DbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DbContext")),
                ServiceLifetime.Transient,
                ServiceLifetime.Transient);
            services.AddScoped<IUserRepository, UserPepository>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddAutoMapper(typeof(UserApiMappingProfiles));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DbContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.WithOrigins("http://localhost:3000", "http://localhost:3000/")
                                .AllowAnyMethod()
                                .AllowAnyHeader()); ;
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
