"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Plus,
  Search,
  Edit3,
  Download,
  Trash2,
  LogOut,
  User as UserIcon,
  Sparkles,
  FileText,
  FilePlus,
  Loader2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ResumeThumbnail from "@/components/resume/ResumeThumbnail";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/resumes");
      if (res.ok) {
        const data = await res.json();
        setResumes(data.resumes || []);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreateResume = async () => {
    if (resumes.length >= 10) {
      alert("You have reached the maximum limit of 10 resumes. Please delete an existing resume to create a new one.");
      return;
    }
    router.push("/create");
  };

  const openDeleteDialog = (id, title, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDeleteTarget({ id, title });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { id } = deleteTarget;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/resumes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setResumes((prev) => prev.filter((r) => (r._id || r.id) !== id));
      }
    } catch (err) {
      console.error("Delete resume error:", err);
    } finally {
      setDeletingId(null);
      setDeleteTarget(null);
    }
  };

  const filteredResumes = resumes.filter((r) =>
    (r.title || "Untitled Resume")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#0b1c30] flex flex-col font-ui selection:bg-indigo-600 selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-40 h-16 px-4 sm:px-8 md:px-12 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 flex items-center justify-between shadow-2xs">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform duration-200 shadow-xs">
            G
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 font-ui">
            GenX
          </span>
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:ring-2 hover:ring-indigo-500/20 transition-all overflow-hidden focus:outline-hidden"
            aria-label="User Profile"
          >
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-bold">
                {session?.user?.name
                  ? session.user.name.charAt(0).toUpperCase()
                  : <UserIcon className="w-4 h-4 text-gray-600" />}
              </div>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-900 truncate">
                  {session?.user?.name || "Logged In User"}
                </p>
                <p className="text-[11px] text-gray-500 truncate font-mono mt-0.5">
                  {session?.user?.email || ""}
                </p>
              </div>

              <Link
                href="/resume"
                className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <FileText className="w-3.5 h-3.5 text-gray-500" />
                Resume Editor
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full flex flex-col">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-24 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
            <p className="font-mono text-xs uppercase tracking-wider">
              Loading user documents...
            </p>
          </div>
        ) : resumes.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-white/80 rounded-xl p-6 sm:p-12 shadow-2xl text-center flex flex-col items-center relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 mb-5 sm:mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <FilePlus className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <h2 className="font-ui text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2 sm:mb-3">
                No Resumes Created Yet
              </h2>
              <p className="font-ui text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-sm leading-relaxed">
                Welcome, <strong className="text-gray-900">{session?.user?.name || "Developer"}</strong>! Create your first ATS-optimized, beautifully styled resume to get started.
              </p>

              <button
                onClick={handleCreateResume}
                disabled={creating}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-[0_4px_20px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.45)] hover:scale-[1.02] transition-all duration-200 active:scale-95 disabled:opacity-60"
              >
                {creating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                <span>{creating ? "Creating Resume..." : "Create My First Resume"}</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-slate-200/80">
              <div>
                <h1 className="font-ui text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-1 sm:mb-2">
                  Dashboard
                </h1>
                <p className="font-ui text-sm sm:text-base text-gray-600">
                  Manage, edit, and export your professional resume documents.
                </p>
              </div>

              <button
                onClick={handleCreateResume}
                disabled={creating || resumes.length >= 10}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-[0_4px_14px_0_rgba(79,70,229,0.35)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.45)] transition-all duration-200 active:scale-95 group disabled:opacity-60"
              >
                {creating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                )}
                <span>{resumes.length >= 10 ? "Limit Reached (10/10)" : creating ? "Creating..." : "Create New Resume"}</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
              <h2 className="font-ui text-lg sm:text-xl font-bold text-gray-900">
                Your Resumes ({filteredResumes.length})
              </h2>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resumes..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded font-ui text-sm text-gray-800 placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredResumes.map((resume) => {
                const targetId = resume._id || resume.id;
                const isDeleting = deletingId === targetId;

                return (
                  <div
                    key={targetId}
                    className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative"
                  >
                    <div className="aspect-[1/1.414] w-full bg-slate-100/70 mb-4 sm:mb-5 rounded-lg overflow-hidden border border-slate-200/60 relative group-hover:border-indigo-200 transition-colors">
                      <ResumeThumbnail resume={resume} />
                      
                      <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] flex items-center justify-center gap-3">
                        <Link
                          href={`/resume?id=${targetId}`}
                          className="p-3 bg-white text-indigo-600 rounded shadow-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200 transform hover:scale-110"
                          title="Edit Resume"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={(e) => openDeleteDialog(targetId, resume.title, e)}
                          disabled={isDeleting}
                          className="p-3 bg-white text-red-500 rounded shadow-lg hover:bg-red-600 hover:text-white transition-colors duration-200 transform hover:scale-110 disabled:opacity-50"
                          title="Delete Resume"
                        >
                          {isDeleting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-ui text-base sm:text-lg font-bold text-gray-900 truncate">
                            {resume.title || resume.basics?.name || "Untitled Resume"}
                          </h3>
                        </div>
                        <p className="font-ui text-xs text-gray-500">
                          Updated {resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : "Recently"}
                        </p>
                      </div>

                      <div className="mt-3 sm:mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/resume?id=${targetId}`}
                          className="text-xs font-mono text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center gap-1 py-1"
                        >
                          Open Studio →
                        </Link>

                        <button
                          onClick={(e) => openDeleteDialog(targetId, resume.title, e)}
                          disabled={isDeleting}
                          className="text-xs font-mono text-gray-400 hover:text-red-600 transition-colors inline-flex items-center gap-1 p-1"
                          title="Delete Resume"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={handleCreateResume}
                disabled={creating || resumes.length >= 10}
                className="bg-white/50 rounded-xl border-2 border-dashed border-slate-300 p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white hover:border-indigo-400 transition-all duration-300 min-h-[260px] sm:min-h-[340px] group shadow-2xs text-left disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-ui text-base sm:text-lg font-bold text-gray-900 mb-1">
                  {resumes.length >= 10 ? "Limit Reached" : "Start from Scratch"}
                </h3>
                <p className="font-ui text-xs text-gray-500 max-w-xs">
                  {resumes.length >= 10 ? "Delete a resume to create a new one." : "Create a fresh ATS-friendly resume."}
                </p>
              </button>
            </div>
          </>
        )}
      </main>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete &quot;{deleteTarget?.title || "this resume"}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {deletingId ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
