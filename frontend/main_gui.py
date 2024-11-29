# import tkinter as tk
# from tkinter import messagebox
# import requests
# from frontend.chatbot_ai import generate_tweet_content

# def fetch_hashtags():
#     response = requests.get('http://127.0.0.1:5000/api/hashtags')
#     hashtags = response.json()['hashtags']
#     dropdown_menu['values'] = hashtags

# def generate_content():
#     audience_description = entry_target_audience.get()
#     content = generate_tweet_content(audience_description)
#     output_text.delete(1.0, tk.END)
#     output_text.insert(tk.END, content)

# def schedule_tweet():
#     tweet_data = {
#         'content': output_text.get("1.0", tk.END).strip(),
#         'hashtag': dropdown_menu.get(),
#         'scheduled_time': entry_schedule_time.get()  # Format: 'YYYY-MM-DD HH:MM:SS'
#     }
#     response = requests.post('http://127.0.0.1:5000/api/tweet', json=tweet_data)
#     messagebox.showinfo("Success", response.json().get('message'))

# root = tk.Tk()
# root.title("Social Campaign Platform")

# entry_target_audience = tk.Entry(root)
# entry_target_audience.grid(row=0, column=1)

# button_fetch = tk.Button(root, text="Fetch Hashtags", command=fetch_hashtags)
# button_fetch.grid(row=1, column=0)

# button_generate = tk.Button(root, text="Generate Content", command=generate_content)
# button_generate.grid(row=2, column=0)

# output_text = tk.Text(root, height=5, width=40)
# output_text.grid(row=3, column=1)

# entry_schedule_time = tk.Entry(root)
# entry_schedule_time.grid(row=4, column=1)

# button_schedule = tk.Button(root, text="Schedule Tweet", command=schedule_tweet)
# button_schedule.grid(row=5, column=0)

# root.mainloop()


# import tkinter as tk
# from tkinter import ttk
# import tkinter.font as tkfont

# class SocialCampaignApp:
#     def __init__(self, root):
#         self.root = root
#         self.root.title("Social Campaign Platform")
#         self.root.geometry("600x700")
#         self.root.configure(bg="#f0f0f0")

#         # Custom styling
#         self.style = ttk.Style()
#         self.style.theme_use('clam')  # Modern theme
#         self.configure_styles()

#         # Create main container
#         self.create_main_container()

#     def configure_styles(self):
#         # Custom color palette
#         self.style.configure("TLabel", 
#             background="#f0f0f0", 
#             foreground="#333333", 
#             font=("Segoe UI", 10)
#         )
#         self.style.configure("TButton", 
#             font=("Segoe UI", 10, "bold"),
#             background="#4CAF50", 
#             foreground="white"
#         )
#         self.style.map("TButton", 
#             background=[('active', '#45a049')]
#         )
#         self.style.configure("TEntry", 
#             font=("Segoe UI", 10)
#         )

#     def create_main_container(self):
#         # Main frame with padding
#         main_frame = ttk.Frame(self.root, padding="20 20 20 20")
#         main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
#         main_frame.configure(style="TFrame")

#         # Title
#         title_font = tkfont.Font(family="Segoe UI", size=16, weight="bold")
#         title_label = ttk.Label(main_frame, text="Social Campaign Generator", font=title_font)
#         title_label.grid(row=0, column=0, columnspan=2, pady=(0, 20))

#         # Target Audience Label and Entry
#         ttk.Label(main_frame, text="Target Audience Description:").grid(row=1, column=0, sticky=tk.W, pady=5)
#         self.entry_target_audience = ttk.Entry(main_frame, width=50)
#         self.entry_target_audience.grid(row=1, column=1, pady=5, sticky=(tk.W, tk.E))

#         # Hashtag Fetch Button
#         self.button_fetch = ttk.Button(main_frame, text="Fetch Hashtags", command=self.fetch_hashtags)
#         self.button_fetch.grid(row=2, column=0, pady=10, sticky=tk.W)

#         # Hashtag Dropdown
#         ttk.Label(main_frame, text="Select Hashtag:").grid(row=3, column=0, sticky=tk.W, pady=5)
#         self.dropdown_menu = ttk.Combobox(main_frame, width=47, state="readonly")
#         self.dropdown_menu.grid(row=3, column=1, pady=5)

#         # Generate Content Button
#         self.button_generate = ttk.Button(main_frame, text="Generate Content", command=self.generate_content)
#         self.button_generate.grid(row=4, column=0, columnspan=2, pady=10)

#         # Output Text Area
#         ttk.Label(main_frame, text="Generated Content:").grid(row=5, column=0, sticky=tk.W, pady=5)
#         self.output_text = tk.Text(main_frame, height=10, width=60, font=("Consolas", 10))
#         self.output_text.grid(row=6, column=0, columnspan=2, pady=5)

#         # Schedule Time
#         ttk.Label(main_frame, text="Schedule Time (Optional):").grid(row=7, column=0, sticky=tk.W, pady=5)
#         self.entry_schedule_time = ttk.Entry(main_frame, width=50)
#         self.entry_schedule_time.grid(row=7, column=1, pady=5)

#         # Schedule Tweet Button
#         self.button_schedule = ttk.Button(main_frame, text="Schedule Tweet", command=self.schedule_tweet)
#         self.button_schedule.grid(row=8, column=0, columnspan=2, pady=10)

#         # Mock data for testing
#         self.sample_hashtags = ['#Python', '#AI', '#MachineLearning', '#DataScience', '#Innovation']

#     def fetch_hashtags(self):
#         # Instead of calling the backend API, just use the sample data
#         self.dropdown_menu['values'] = self.sample_hashtags
#         if self.sample_hashtags:
#             self.dropdown_menu.set(self.sample_hashtags[0])

#     def generate_content(self):
#         # Mock tweet generation logic
#         audience_description = self.entry_target_audience.get()
#         content = f"Generated tweet content for: {audience_description}\n\n" \
#                   f"Tweet ideas targeting {audience_description}:\n" \
#                   f"1. Engaging point about the topic\n" \
#                   f"2. Interesting statistic or insight\n" \
#                   f"3. Call to action or thought-provoking statement"
        
#         self.output_text.delete(1.0, tk.END)
#         self.output_text.insert(tk.END, content)

#     def schedule_tweet(self):
#         from tkinter import messagebox
        
#         tweet_content = self.output_text.get("1.0", tk.END).strip()
#         selected_hashtag = self.dropdown_menu.get()
#         schedule_time = self.entry_schedule_time.get()

#         # Just show the result in a message box for now
#         messagebox.showinfo("Tweet Scheduled", 
#                             f"Tweet: {tweet_content}\n"
#                             f"Hashtag: {selected_hashtag}\n"
#                             f"Scheduled Time: {schedule_time or 'Immediate'}\n"
#                             f"Scheduled successfully!")

# def main():
#     root = tk.Tk()
#     app = SocialCampaignApp(root)
#     root.mainloop()

# if __name__ == "__main__":
#     main()

# import tkinter as tk
# from tkinter import ttk
# import tkinter.font as tkfont
# import requests  # Make sure to import requests to call your backend

# class SocialCampaignApp:
#     def __init__(self, root):
#         self.root = root
#         self.root.title("Social Campaign Platform")
#         self.root.geometry("600x700")
#         self.root.configure(bg="#f0f0f0")

#         # Custom styling
#         self.style = ttk.Style()
#         self.style.theme_use('clam')  # Modern theme
#         self.configure_styles()

#         # Create main container
#         self.create_main_container()

#         # Bind key release event to fetch hashtags
#         self.entry_target_audience.bind('<KeyRelease>', self.on_key_release)

#     def configure_styles(self):
#         # Custom color palette
#         self.style.configure("TLabel", 
#             background="#f0f0f0", 
#             foreground="#333333", 
#             font=("Segoe UI", 10)
#         )
#         self.style.configure("TButton", 
#             font=("Segoe UI", 10, "bold"),
#             background="#4CAF50", 
#             foreground="white"
#         )
#         self.style.map("TButton", 
#             background=[('active', '#45a049')]
#         )
#         self.style.configure("TEntry", 
#             font=("Segoe UI", 10)
#         )

#     def create_main_container(self):
#         # Main frame with padding
#         main_frame = ttk.Frame(self.root, padding="20 20 20 20")
#         main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
#         main_frame.configure(style="TFrame")

#         # Title
#         title_font = tkfont.Font(family="Segoe UI", size=16, weight="bold")
#         title_label = ttk.Label(main_frame, text="Social Campaign Generator", font=title_font)
#         title_label.grid(row=0, column=0, columnspan=2, pady=(0, 20))

#         # Target Audience Label and Entry
#         ttk.Label(main_frame, text="Target Audience Description:").grid(row=1, column=0, sticky=tk.W, pady=5)
#         self.entry_target_audience = ttk.Entry(main_frame, width=50)
#         self.entry_target_audience.grid(row=1, column=1, pady=5, sticky=(tk.W, tk.E))

#         # Hashtag Dropdown
#         ttk.Label(main_frame, text="Select Hashtag:").grid(row=3, column=0, sticky=tk.W, pady=5)
#         self.dropdown_menu = ttk.Combobox(main_frame, width=47, state="readonly")
#         self.dropdown_menu.grid(row=3, column=1, pady=5)

#         # Generate Content Button
#         self.button_generate = ttk.Button(main_frame, text="Generate Content", command=self.generate_content)
#         self.button_generate.grid(row=4, column=0, columnspan=2, pady=10)

#         # Output Text Area
#         ttk.Label(main_frame, text="Generated Content:").grid(row=

import tkinter as tk
from tkinter import ttk
import tkinter.font as tkfont
import requests
from tkinter import messagebox

class SocialCampaignApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Social Campaign Platform")
        self.root.geometry("600x700")
        self.root.configure(bg="#f0f0f0")

        # Custom styling
        self.style = ttk.Style()
        self.style.theme_use('clam')  # Modern theme
        self.configure_styles()

        # Create main container
        self.create_main_container()

        # Bind key release event to fetch hashtags
        self.entry_target_audience.bind('<KeyRelease>', self.on_key_release)

    def configure_styles(self):
        # Custom color palette
        self.style.configure("TLabel", 
            background="#f0f0f0", 
            foreground="#333333", 
            font=("Segoe UI", 10)
        )
        self.style.configure("TButton", 
            font=("Segoe UI", 10, "bold"),
            background="#4CAF50", 
            foreground="white"
        )
        self.style.map("TButton", 
            background=[('active', '#45a049')]
        )
        self.style.configure("TEntry", 
            font=("Segoe UI", 10)
        )

    def create_main_container(self):
        # Main frame with padding
        main_frame = ttk.Frame(self.root, padding="20 20 20 20")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        main_frame.configure(style="TFrame")

        # Title
        title_font = tkfont.Font(family="Segoe UI", size=16, weight="bold")
        title_label = ttk.Label(main_frame, text="Social Campaign Generator", font=title_font)
        title_label.grid(row=0, column=0, columnspan=2, pady=(0, 20))

        # Target Audience Label and Entry
        ttk.Label(main_frame, text="Target Audience Description:").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.entry_target_audience = ttk.Entry(main_frame, width=50)
        self.entry_target_audience.grid(row=1, column=1, pady=5, sticky=(tk.W, tk.E))

        # Hashtag Dropdown
        ttk.Label(main_frame, text="Select Hashtag:").grid(row=3, column=0, sticky=tk.W, pady=5)
        self.dropdown_menu = ttk.Combobox(main_frame, width=47, state="readonly")
        self.dropdown_menu.grid(row=3, column=1, pady=5)

        # Generate Content Button
        self.button_generate = ttk.Button(main_frame, text="Generate Content", command=self.generate_content)
        self.button_generate.grid(row=4, column=0, columnspan=2, pady=10)

        # Output Text Area
        ttk.Label(main_frame, text="Generated Content:").grid(row=5, column=0, sticky=tk.W, pady=5)
        self.output_text = tk.Text(main_frame, height=10, width=60, font=("Consolas", 10))
        self.output_text.grid(row=6, column=0, columnspan=2, pady=5)

        # Schedule Time
        ttk.Label(main_frame, text="Schedule Time (Optional):").grid(row=7, column=0, sticky=tk.W, pady=5)
        self.entry_schedule_time = ttk.Entry(main_frame, width=50)
        self.entry_schedule_time.grid(row=7, column=1, pady=5)

        # Schedule Tweet Button
        self.button_schedule = ttk.Button(main_frame, text="Schedule Tweet", command=self.schedule_tweet)
        self.button_schedule.grid(row=8, column=0, columnspan=2, pady=10)

        # New Hashtag Entry
        ttk.Label(main_frame, text="Create New Hashtag:").grid(row=9, column=0, sticky=tk.W, pady=5)
        self.entry_new_hashtag = ttk.Entry(main_frame, width=50)
        self.entry_new_hashtag.grid(row=9, column=1, pady=5)

        # Create Hashtag Button
        self.button_create_hashtag = ttk.Button(main_frame, text="Create Hashtag", command=self.create_hashtag)
        self.button_create_hashtag.grid(row=10, column=0, columnspan=2, pady=10)

        # Mock data for testing
        self.sample_hashtags = ['#Python', '#AI', '#MachineLearning', '#DataScience', '#Innovation']

    def on_key_release(self, event):
        # Fetch trending hashtags based on user input
        query = self.entry_target_audience.get()
        if query:
            response = requests.get(f'http://localhost:5000/api/trending_hashtags?query={query}')
            if response.status_code == 200:
                hashtags = response.json().get('hashtags', [])
                self.dropdown_menu['values'] = hashtags
                if hashtags:
                    self.dropdown_menu.current(0)  # Select the first hashtag by default
            else:
                messagebox.showerror("Error", "Failed to fetch trending hashtags.")

    def generate_content(self):
        # Generate content based on selected hashtag and target audience
        selected_hashtag = self.dropdown_menu.get()
        target_audience = self.entry_target_audience.get()
        if selected_hashtag and target_audience:
            content = f"Engaging content for {target_audience} using {selected_hashtag}!"
            self.output_text.delete(1.0, tk.END)  # Clear previous content
            self.output_text.insert(tk.END, content)
        else:
            messagebox.showwarning("Warning", "Please select a hashtag and enter a target audience.")

    def schedule_tweet(self):
        # Schedule the tweet with the generated content
        content = self.output_text.get(1.0, tk.END).strip()
        schedule_time = self.entry_schedule_time.get()
        if content:
            tweet_data = {
                'hashtag': self.dropdown_menu.get(),
                'content': content,
                'scheduled_time': schedule_time
            }
            response = requests.post('http://localhost:5000/api/tweet', json=tweet_data)
            if response.status_code == 200:
                messagebox.showinfo("Success", "Tweet scheduled successfully!")
            else:
                messagebox.showerror("Error", "Failed to schedule tweet.")
        else:
            messagebox.showwarning("Warning", "No content to schedule.")

    def create_hashtag(self):
        # Create a new hashtag
        new_hashtag = self.entry_new_hashtag.get().strip()
        if new_hashtag:
            hashtag_data = {
                'hashtag': new_hashtag,
                'content_type': 'general'  # You can modify this as needed
            }
            response = requests.post('http://localhost:5000/api/create_hashtag', json=hashtag_data)
            if response.status_code == 201:
                messagebox.showinfo("Success", f"Hashtag '{new_hashtag}' created successfully!")
                self.entry_new_hashtag.delete(0, tk.END)  # Clear the entry
            else:
                messagebox.showerror("Error", "Failed to create hashtag.")
        else:
            messagebox.showwarning("Warning", "Please enter a hashtag.")

if __name__ == "__main__":
    root = tk.Tk()
    app = SocialCampaignApp(root)
    root.mainloop()