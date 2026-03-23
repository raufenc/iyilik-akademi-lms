import Button from '../ui/Button'

export default function LessonPlayer({ driveId, onComplete }) {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="aspect-video rounded-2xl overflow-hidden bg-black mb-6">
        <iframe
          src={`https://drive.google.com/file/d/${driveId}/preview`}
          width="100%"
          height="100%"
          allow="autoplay"
          allowFullScreen
          className="border-0"
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-text-muted mb-4">Videoyu izledikten sonra devam edebilirsin.</p>
        <Button onClick={onComplete} size="lg">
          Videoyu İzledim, Devam Et
        </Button>
      </div>
    </div>
  )
}
