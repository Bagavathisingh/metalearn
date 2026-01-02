import { useState, useRef, useEffect } from "react";
import { useNotification } from "../components/Notification";
import { useConfirm } from "../components/ConfirmModal";

export default function CourseAdmin() {
  const [subjectTopic, setSubjectTopic] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [subImage, setSubImage] = useState(null);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const subImageRef = useRef(null);
  const api = import.meta.env.VITE_URL;
  const notify = useNotification();
  const { showConfirm } = useConfirm();

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("videoUrl", videoUrl);
    formData.append("subjectTitle", subjectTopic);
    formData.append("content", subjectDescription);
    if (subImage) formData.append("image", subImage);

    try {
      const url = editingId ? `${api}/subjectsUpdate/${editingId}` : `${api}/subjects`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) throw new Error("Upload response not OK");

      notify(editingId ? "Course updated successfully." : "Course module synchronization successful.", "success");

      resetForm();
      listItems();
    } catch (err) {
      console.error("Upload error:", err);
      notify("Protocol failed.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    showConfirm(
      "Warning: This action will permanently purge the selected course asset from the academy matrix. Continue?",
      async () => {
        try {
          const response = await fetch(`${api}/subjectsDelete/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) throw new Error("Delete failed");
          notify("Course asset terminated.", "success");
          listItems();
        } catch (err) {
          console.error("Delete error:", err);
          notify("Termination failed.", "error");
        }
      },
      "ASSET_TERMINATION",
      "danger"
    );
  };

  const handleEdit = (list) => {
    setEditingId(list._id);
    setSubjectTopic(list.subjectTitle);
    setSubjectDescription(list.content);
    setVideoUrl(list.videoUrl || "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setSubjectTopic("");
    setSubjectDescription("");
    setVideoUrl("");
    setSubImage(null);
    if (subImageRef.current) subImageRef.current.value = null;
  };

  const listItems = () => {
    fetch(api + "/subjectsGet")
      .then((res) => res.json())
      .then((res) => {
        setItem(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("fetch Error :", err);
        setItem([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    listItems();
  }, []);

  if (loading)
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center gap-6 animate-pulse">
        <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-cyan-500 animate-spin"></div>
        <p className="text-xl font-heading font-black text-slate-500 uppercase tracking-widest">Accessing Asset Pipeline...</p>
      </div>
    );

  return (
    <div className="animate-fade-in space-y-12">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">

        {/* Course Injector */}
        <div className="space-y-8">
          <div className="space-y-1">
            <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight">Course_Injector</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Deploy Premium Academy Modules</p>
          </div>

          <form onSubmit={handleUpload} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 font-mono text-[8px] text-white select-none">
              DATA_ENCODING: ACTIVE<br />
              SYNC_CHANNEL: COURSE_01
            </div>

            <div className="space-y-4">
              <div className="space-y-1 group/input">
                <label className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 transition-all group-focus-within/input:text-white">Cover_Asset</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={subImageRef}
                  className="w-full text-[10px] text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-white/5 file:text-white hover:file:bg-cyan-500/10 cursor-pointer"
                  onChange={(e) => setSubImage(e.target.files[0])}
                  required={editingId ? false : true}
                />
              </div>

              <div className="space-y-2 group/input">
                <label className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 transition-all group-focus-within/input:text-white">Module_Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Advanced JavaScript Patterns"
                  value={subjectTopic}
                  className="w-full bg-white/[0.03] border-b border-white/10 p-4 text-white outline-none focus:border-cyan-500 focus:bg-white/[0.06] transition-all rounded-t-xl"
                  onChange={(e) => setSubjectTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2 group/input">
                <label className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 transition-all group-focus-within/input:text-white">Stream_URL</label>
                <input
                  required
                  type="text"
                  placeholder="https://vimeo.com/..."
                  value={videoUrl}
                  className="w-full bg-white/[0.03] border-b border-white/10 p-4 text-white outline-none focus:border-cyan-500 focus:bg-white/[0.06] transition-all rounded-t-xl"
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2 group/input">
                <label className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 transition-all group-focus-within/input:text-white">Module_Overview</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Input course curriculum summary..."
                  value={subjectDescription}
                  className="w-full bg-white/[0.03] border-b border-white/10 p-4 text-white outline-none focus:border-cyan-500 focus:bg-white/[0.06] transition-all rounded-t-xl resize-none"
                  onChange={(e) => setSubjectDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-5 bg-cyan-500 text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:bg-white transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            >
              {isUploading ? "PROCESS_SYNC..." : editingId ? "CONFIRM_MODIFICATION" : "DEPLOY_COURSE"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full py-3 bg-white/5 text-white/40 font-black uppercase text-[10px] tracking-[0.2em] rounded-xl hover:bg-white/10 transition-all mt-2"
              >
                CANCEL_OPERATION
              </button>
            )}
          </form>
        </div>

        {/* List Interface */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight">Academic_Inventory</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Existing Course Asset Modules</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
              ASSETS: {item.length}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 max-h-[800px] overflow-y-auto custom-scroll pr-4">
            {item.map((list, index) => (
              <div key={index} className="group p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-6 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 font-mono text-[8px] text-white">MOD_{index + 101}</div>

                <div className="space-y-6">
                  <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative">
                    <img src={`${api}${list.imageUrl}`} alt={list.subjectTitle} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                      <h4 className="text-xl font-black text-white uppercase tracking-tighter leading-none">{list.subjectTitle}</h4>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center gap-2 ${list.videoUrl != null ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${list.videoUrl != null ? "bg-emerald-500" : "bg-red-500"}`} />
                      {list.videoUrl != null ? "Stream_Live" : "No_Stream"}
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                      Asset_Class: S
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3 italic">
                    "{list.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-black text-slate-600 uppercase tracking-[0.2em]">
                  <div className="flex gap-4">
                    <button onClick={() => handleEdit(list)} className="text-cyan-500 hover:text-white transition-colors cursor-pointer">MODIFY_NODE</button>
                    <button onClick={() => handleDelete(list._id)} className="text-red-500 hover:text-white transition-colors cursor-pointer">TERMINATE_LOG</button>
                  </div>
                  <span className="text-cyan-500/50">Verified_Integrity</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

