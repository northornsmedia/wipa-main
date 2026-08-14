"use client";

import React, { useState } from "react";

export default function UploadEpisodeForm() {
  const [isFeatured, setIsFeatured] = useState(false);

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen font-sans pb-12">
      {/* Header Section */}
      <div className="bg-[#e89610] text-white pt-10 pb-24 px-8 mb-[-60px]">
        <div className="max-w-6xl mx-auto">
          <button className="flex items-center text-sm font-medium hover:underline mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
            Back to Podcasts
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white p-3 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e89610" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Upload New Episode</h1>
          </div>
          <p className="text-white/90 ml-[64px] font-medium text-lg">Publish your latest podcast episode directly to the WIPA network.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 px-8 relative z-10">
        
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Core Details Panel */}
          <div className="bg-[#121212] border border-[#222] rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Core Details</h3>
            
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Episode Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. The IP Innovators Series: AI and the Future of Copyright"
                  className="bg-black border border-[#333] rounded-md p-3 text-sm focus:outline-none focus:border-gray-500 w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Description / Show Notes</label>
                <textarea 
                  placeholder="Enter a brief description for this episode..."
                  rows={4}
                  className="bg-black border border-[#333] rounded-md p-3 text-sm focus:outline-none focus:border-gray-500 w-full resize-y"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400">Content Type</label>
                  <select className="bg-black border border-[#333] rounded-md p-3 text-sm focus:outline-none focus:border-gray-500 w-full text-white appearance-none">
                    <option>Audio Interview</option>
                    <option>Solo Episode</option>
                    <option>Panel Discussion</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400">Subcategory Hub</label>
                  <select className="bg-black border border-[#333] rounded-md p-3 text-sm focus:outline-none focus:border-gray-500 w-full text-white appearance-none">
                    <option>Podcasts</option>
                    <option>Webinars</option>
                    <option>Events</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[calc(50%-10px)]">
                <label className="text-sm text-gray-400">Album Category</label>
                <select className="bg-black border border-[#333] rounded-md p-3 text-sm focus:outline-none focus:border-gray-500 w-full text-white appearance-none">
                  <option>No Category</option>
                  <option>Season 1</option>
                  <option>Specials</option>
                </select>
              </div>
            </div>
          </div>

          {/* Personnel & Timing Panel */}
          <div className="bg-[#121212] border border-[#222] rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Personnel & Timing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Host Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. WIPA Media"
                  className="bg-black border border-[#333] rounded-md p-3 text-sm focus:outline-none focus:border-gray-500 w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Guest Name(s)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dr. Elena Rostova"
                  className="bg-black border border-[#333] rounded-md p-3 text-sm focus:outline-none focus:border-gray-500 w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Topic Tag</label>
                <select className="bg-black border border-[#333] rounded-md p-3 text-sm focus:outline-none focus:border-gray-500 w-full text-white appearance-none">
                  <option>AI in IP</option>
                  <option>Trademarks</option>
                  <option>Patents</option>
                  <option>Copyright</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Duration (MM:SS)</label>
                <input 
                  type="text" 
                  placeholder="45:00"
                  className="bg-black border border-[#333] rounded-md p-3 text-sm focus:outline-none focus:border-gray-500 w-full"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
          
          {/* Media Uploads Panel */}
          <div className="bg-[#121212] border border-[#222] rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Media Uploads</h3>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Cover Image</label>
                <div className="border border-dashed border-[#333] rounded-md flex flex-col items-center justify-center h-[180px] bg-black hover:bg-[#0a0a0a] transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mb-2">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                  </svg>
                  <span className="text-sm text-gray-500">Click to upload or drag image here</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Audio File (MP3)</label>
                <div className="border border-dashed border-[#333] rounded-md flex flex-col items-center justify-center h-[160px] bg-black hover:bg-[#0a0a0a] transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mb-2">
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4-4 4 4"/>
                  </svg>
                  <span className="text-sm text-gray-500">Upload audio file</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visibility Options Panel */}
          <div className="bg-[#121212] border border-[#222] rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Visibility Options</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium text-sm">Featured Episode</span>
                <span className="text-xs text-gray-500">Display this prominently in the hero banner.</span>
              </div>
              
              <button 
                type="button"
                onClick={() => setIsFeatured(!isFeatured)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isFeatured ? 'bg-white' : 'bg-[#333]'}`}
              >
                <span 
                  className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${isFeatured ? 'translate-x-6' : 'translate-x-1'}`} 
                />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
