import { createClient } from "@supabase/supabase-js";

const supabaseConnexion = createClient(
	"https://gwxtdxqzxixpfuutmjbe.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3eHRkeHF6eGl4cGZ1dXRtamJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MTc3NDUsImV4cCI6MjA4NDM5Mzc0NX0.X7o6a599W1wyV4kVcSri8jSozFu2VtMzCxvr4gze9MM",
);

export { supabaseConnexion };
