import { supabase } from "./config.js";

async function loadNotices() {

  const list = document.getElementById("notice-list");

  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    list.innerHTML = "<p>Failed to load notices.</p>";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    list.innerHTML = "<p>No notices available.</p>";
    return;
  }

  list.innerHTML = data.map(notice => `
    <div style="background:#fff;padding:20px;margin-bottom:15px;border-left:5px solid #0d6efd;box-shadow:0 2px 8px rgba(0,0,0,.1);border-radius:8px;">
      <h3>${notice.title}</h3>
      <p>${notice.description}</p>
    </div>
  `).join("");

}

loadNotices();