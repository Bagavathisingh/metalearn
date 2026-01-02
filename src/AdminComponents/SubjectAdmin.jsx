import { useState, useRef, useEffect } from "react";
import { useNotification } from "../components/Notification";

export default function SubjectAdmin() {
  const [subjectTopic, setSubjectTopic] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [subImage, setSubImage] = useState(null);
  const [materialPdf, setMaterialPdf] = useState(null);
  const [qnPdf, setQnPdf] = useState(null);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const subImageRef = useRef(null);
  const materialPdfRef = useRef(null);
  const qnPdfRef = useRef(null);

  const api = import.meta.env.VITE_URL;
  const notify = useNotification();

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("subjectTopic", subjectTopic);
    formData.append("subjectDescription", subjectDescription);
    formData.append("VideoUrl", videoUrl);
    if (subImage) formData.append("subImage", subImage);
    if (materialPdf) formData.append("MaterialPdf", materialPdf);
    if (qnPdf) formData.append("QnPdf", qnPdf);

    try {
      const response = await fetch(`${api}/uploadSubject`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload response not OK");

      notify("Subject asset synchronization complete.", "success");

      setSubjectTopic("");
      setSubjectDescription("");
      setVideoUrl("");
      setSubImage(null);
      setMaterialPdf(null);
      setQnPdf(null);
      if (subImageRef.current) subImageRef.current.value = null;
      if (materialPdfRef.current) materialPdfRef.current.value = null;
      if (qnPdfRef.current) qnPdfRef.current.value = null;
      listItems();
    } catch (err) {
      console.error("Upload error:", err);
      notify("Upload protocol failed.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const listItems = () => {
    fetch(api + "/get-subjects")
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
        <p className="text-xl font-heading font-black text-slate-500 uppercase tracking-widest">Accessing Logic Matrix...</p>
      </div>
    );

  return (
    <div className="animate-fade-in space-y-12">
      <div className="grid grid-cols-1 xl:grid-cols-[450px_1fr] gap-12 items-start">

        {/* Upload Form: Asset Injector */}
        <div className="space-y-8">
          <div className="space-y-1">
            <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight">Asset_Injector</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Deploy New Subject Modules</p>
          </div>

          <form onSubmit={handleUpload} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 font-mono text-[8px] text-white select-none">
              ENCRYPTING_UPLOAD...<br />
              MIME_VALIDATION: ON
            </div>

            <div className="space-y-4">
              <div className="space-y-2 group/input">
                <label className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 transition-all group-focus-within/input:text-white">Subject_Topic</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Quantum Mechanics"
                  value={subjectTopic}
                  className="w-full bg-white/[0.03] border-b border-white/10 p-4 text-white outline-none focus:border-cyan-500 focus:bg-white/[0.06] transition-all rounded-t-xl"
                  onChange={(e) => setSubjectTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2 group/input">
                <label className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 transition-all group-focus-within/input:text-white">Video_Link</label>
                <input
                  required
                  type="text"
                  placeholder="https://youtube.com/..."
                  value={videoUrl}
                  className="w-full bg-white/[0.03] border-b border-white/10 p-4 text-white outline-none focus:border-cyan-500 focus:bg-white/[0.06] transition-all rounded-t-xl"
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2 group/input">
                <label className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 transition-all group-focus-within/input:text-white">Dossier_Description</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Input subject specifications..."
                  value={subjectDescription}
                  className="w-full bg-white/[0.03] border-b border-white/10 p-4 text-white outline-none focus:border-cyan-500 focus:bg-white/[0.06] transition-all rounded-t-xl resize-none"
                  onChange={(e) => setSubjectDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Cover_Image</label>
                  <input type="file" accept="image/*" ref={subImageRef} onChange={(e) => setSubImage(e.target.files[0])} required className="w-full text-[10px] text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-white/5 file:text-white hover:file:bg-cyan-500/10 cursor-pointer" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Resource_PDF</label>
                  <input type="file" accept="application/pdf" ref={materialPdfRef} onChange={(e) => setMaterialPdf(e.target.files[0])} required className="w-full text-[10px] text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-white/5 file:text-white hover:file:bg-cyan-500/10 cursor-pointer" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-slate-500 uppercase tracking-widest ml-1">Question_Bank_PDF</label>
                  <input type="file" accept="application/pdf" ref={qnPdfRef} onChange={(e) => setQnPdf(e.target.files[0])} required className="w-full text-[10px] text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-white/5 file:text-white hover:file:bg-cyan-500/10 cursor-pointer" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-5 bg-cyan-500 text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:bg-white transition-all active:scale-95 disabled:opacity-50 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            >
              {isUploading ? "INJECTING..." : "EXECUTE_DEPLOYMENT"}
            </button>
          </form>
        </div>

        {/* List Interface: Current Matrix */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight">Active_Matrix</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Existing Logical Subject Structures</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
              NODES: {item.length}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[800px] overflow-y-auto custom-scroll pr-4">
            {item.map((list, index) => (
              <div key={index} className="group p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-500 animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 font-mono text-[8px] text-white">ID_{list._id?.slice(-4)}</div>

                <div className="flex gap-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/5 flex-shrink-0 shadow-xl">
                    <img src={`${api}${list.subImageUrl}`} alt={list.subjectTopic} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                  </div>
                  <div className="space-y-2 py-1">
                    <h4 className="text-lg font-black text-white uppercase leading-tight group-hover:text-cyan-400 transition-colors">{list.subjectTopic}</h4>
                    <div className="flex gap-2">
                      <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${list.MaterialPdf ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                        {list.MaterialPdf ? "PDF_LOADED" : "PDF_MISSING"}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${list.videoUrl || list.VideoUrl ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                        {list.videoUrl || list.VideoUrl ? "SIG_STABLE" : "SIG_LOST"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">
                    {list.subjectDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[8px] font-black text-slate-600 uppercase tracking-widest pt-2">
                  <span>Node_{index + 1}</span>
                  <span>Registry: Internal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

