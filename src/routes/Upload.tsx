import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from 'react'
import { Link } from 'react-router-dom'
import Card from '@/components/Card'
import Input from '@/components/Input'
import useAuth from '@/hooks/useAuth'

type UploadMethod = 'file' | 'url'

type SubmissionDetails =
  | {
      kind: 'file'
      title: string
      description: string
      fileName: string
      fileSize: number
    }
  | {
      kind: 'url'
      title: string
      description: string
      url: string
    }

const ACCEPTED_FILE_TYPES =
  '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.md,.csv,.rtf,.mp3,.wav,.m4a,.aac,.mp4,.mov,.mkv'

function formatFileSize(bytes: number): string {
  if (!bytes) {
    return '0 B'
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  )
  const size = bytes / 1024 ** exponent

  return `${size.toFixed(size >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`
}

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value)

    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch (error) {
    return false
  }
}

function Upload() {
  const { isAuthenticated } = useAuth()

  const [activeMethod, setActiveMethod] = useState<UploadMethod>('file')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [urlValue, setUrlValue] = useState('')
  const [fileError, setFileError] = useState<string | null>(null)
  const [urlError, setUrlError] = useState<string | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [submissionDetails, setSubmissionDetails] = useState<SubmissionDetails | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const submitTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current !== null) {
        window.clearTimeout(submitTimeoutRef.current)
      }
    }
  }, [])

  const methodToggleDisabled = isSubmitting || isProcessing
  const submitDisabled = isSubmitting || isProcessing

  const handleMethodChange = (method: UploadMethod) => {
    if (methodToggleDisabled) {
      return
    }

    setActiveMethod(method)
    setSubmissionDetails(null)
    setIsProcessed(false)
    setFileError(null)
    setUrlError(null)

    if (method === 'file') {
      setUrlValue('')
    } else {
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null

    setSelectedFile(file)
    setSubmissionDetails(null)
    setIsProcessed(false)
    setFileError(null)
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragActive(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragActive(false)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const file = event.dataTransfer.files?.[0]

    if (file) {
      setActiveMethod('file')
      setSelectedFile(file)
      setSubmissionDetails(null)
      setIsProcessed(false)
      setFileError(null)
      setUrlValue('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }

    setIsDragActive(false)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrlValue(event.target.value)
    setSubmissionDetails(null)
    setIsProcessed(false)

    if (urlError) {
      setUrlError(null)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (submitDisabled) {
      return
    }

    setFileError(null)
    setUrlError(null)
    setIsProcessed(false)

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()
    const trimmedUrl = urlValue.trim()

    if (activeMethod === 'file') {
      if (!selectedFile) {
        setFileError('Please select a file to upload.')
        return
      }
    } else {
      if (!trimmedUrl) {
        setUrlError('Please enter a URL to upload.')
        return
      }

      if (!isValidUrl(trimmedUrl)) {
        setUrlError('Please enter a valid URL.')
        return
      }
    }

    const submissionTitle =
      trimmedTitle ||
      (activeMethod === 'file' && selectedFile ? selectedFile.name : 'Untitled upload')

    if (submitTimeoutRef.current !== null) {
      window.clearTimeout(submitTimeoutRef.current)
    }

    setIsSubmitting(true)
    setIsProcessing(true)

    if (activeMethod === 'file' && selectedFile) {
      setSubmissionDetails({
        kind: 'file',
        title: submissionTitle,
        description: trimmedDescription,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
      })
    } else {
      setSubmissionDetails({
        kind: 'url',
        title: submissionTitle,
        description: trimmedDescription,
        url: trimmedUrl,
      })
    }

    // TODO: Integrate with the noteably-backend upload API and WebSocket progress updates
    submitTimeoutRef.current = window.setTimeout(() => {
      setIsSubmitting(false)
      setIsProcessing(false)
      setIsProcessed(true)
    }, 2000)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setSubmissionDetails(null)
    setIsProcessed(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24">
        <Card className="space-y-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-slate-100">Log in to upload</h1>
          <p className="text-lg text-slate-300">
            Sign in to upload files or links and unlock AI-powered summaries.
          </p>
          <div className="flex justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Go to login
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  const dropZoneClasses = [
    'relative',
    'flex',
    'w-full',
    'flex-col',
    'items-center',
    'justify-center',
    'rounded-2xl',
    'border-2',
    'border-dashed',
    'px-6',
    'py-16',
    'text-center',
    'transition-colors',
    'cursor-pointer',
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-500',
  ]

  if (isDragActive) {
    dropZoneClasses.push('border-blue-500', 'bg-blue-500/10')
  } else {
    dropZoneClasses.push(
      'border-slate-700',
      'bg-slate-900/40',
      'hover:border-blue-500',
      'hover:bg-blue-500/10',
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-bold text-slate-100">Upload to Noteably</h1>
        <p className="text-lg text-slate-300">
          Bring your documents or links and let AI do the organizing.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <Card className="space-y-6">
          <Input
            label="Title"
            placeholder="Name your upload"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoComplete="off"
          />
          <Input
            label="Description"
            placeholder="Add optional context or instructions"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            multiline
          />
        </Card>

        <Card className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/60 p-1">
            <button
              type="button"
              onClick={() => handleMethodChange('file')}
              disabled={methodToggleDisabled}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeMethod === 'file'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              } ${methodToggleDisabled ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              File upload
            </button>
            <button
              type="button"
              onClick={() => handleMethodChange('url')}
              disabled={methodToggleDisabled}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeMethod === 'url'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              } ${methodToggleDisabled ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              URL input
            </button>
          </div>

          {activeMethod === 'file' ? (
            <div className="space-y-4">
              <div
                className={dropZoneClasses.join(' ')}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                onClick={handleBrowseClick}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    handleBrowseClick()
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_FILE_TYPES}
                  onChange={handleFileChange}
                  className="sr-only"
                />
                <div className="flex flex-col items-center gap-3">
                  <span aria-hidden className="text-4xl">
                    📂
                  </span>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-slate-100">
                      Drag &amp; drop files here
                    </p>
                    <p className="text-sm text-slate-400">
                      or click to browse from your device. Accepted: PDF, DOCX, PPTX,
                      TXT, MP3, MP4, and more.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleBrowseClick()
                    }}
                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Browse files
                  </button>
                </div>
              </div>

              {selectedFile ? (
                <div className="flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1 text-left">
                    <p className="font-medium text-slate-100">{selectedFile.name}</p>
                    <p className="text-sm text-slate-400">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-300">
                      Ready
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : null}

              {fileError ? (
                <p className="text-sm text-red-400">{fileError}</p>
              ) : null}
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                label="Content URL"
                placeholder="Paste YouTube URL or document link"
                value={urlValue}
                onChange={handleUrlChange}
                type="url"
                autoComplete="off"
                inputMode="url"
                spellCheck={false}
                error={urlError ?? undefined}
                description="Supports YouTube videos and publicly accessible document links."
              />
            </div>
          )}
        </Card>

        <Card className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-400">
              Give your upload a clear title and optional context to get sharper summaries.
            </div>
            <button
              type="submit"
              disabled={submitDisabled}
              className={`inline-flex items-center justify-center rounded-xl px-8 py-3 text-lg font-semibold transition-colors ${
                submitDisabled
                  ? 'bg-blue-600/70 text-white/80 opacity-70'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Uploading…' : 'Start upload'}
            </button>
          </div>
          <p className="text-sm text-slate-400">
            Your content will be securely processed and analyzed. Progress updates will appear below.
          </p>
        </Card>
      </form>

      {isProcessing ? (
        <Card className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 animate-ping rounded-full bg-blue-500" aria-hidden />
            <p className="text-base font-medium text-slate-100">
              Processing your upload...
            </p>
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded-lg bg-slate-800/70" />
            <div className="h-4 w-5/6 animate-pulse rounded-lg bg-slate-800/60" />
            <div className="h-4 w-2/3 animate-pulse rounded-lg bg-slate-800/40" />
          </div>
          <p className="text-sm text-slate-400">
            Sit tight while we analyze your upload. Real-time progress will show up here once the
            backend WebSocket integration is enabled.
          </p>
        </Card>
      ) : null}

      {isProcessed && submissionDetails ? (
        <Card className="space-y-5 border border-blue-500/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                Upload complete
              </p>
              <h2 className="text-2xl font-semibold text-slate-100">
                {submissionDetails.title}
              </h2>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-lg border border-blue-500/50 px-4 py-2 text-sm font-semibold text-blue-300 transition-colors hover:border-blue-400 hover:text-blue-200"
            >
              View dashboard
            </Link>
          </div>

          <div className="space-y-1 rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Source
            </p>
            {submissionDetails.kind === 'file' ? (
              <div className="space-y-1">
                <p className="text-base font-medium text-slate-100">
                  {submissionDetails.fileName}
                </p>
                <p className="text-sm text-slate-400">
                  {formatFileSize(submissionDetails.fileSize)}
                </p>
              </div>
            ) : (
              <p className="break-words text-base font-medium text-slate-100">
                {submissionDetails.url}
              </p>
            )}
            {submissionDetails.description ? (
              <p className="pt-2 text-sm text-slate-400">
                {submissionDetails.description}
              </p>
            ) : null}
          </div>

          <p className="text-sm text-slate-400">
            We&apos;ll take you to a detailed summary once the backend integration is connected. Until
            then, this placeholder confirms everything is ready.
          </p>
        </Card>
      ) : null}
    </div>
  )
}

export default Upload
