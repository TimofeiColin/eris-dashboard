import { useState } from 'react'
import addIcon from '@material-symbols/svg-400/outlined/add.svg'
import { Button } from '../../components/button'
import { PageHeader } from '../../components/page-header'
import ColorsTable from './ColorsTable.tsx'
import ColorFormModal from './ColorFormModal.tsx'
import DeleteColorModal from './DeleteColorModal.tsx'
import type { Color } from '../../api'

type ColorModal =
  | { type: 'create' }
  | { type: 'edit'; color: Color }
  | { type: 'delete'; color: Color }

function Colors() {
  const [modal, setModal] = useState<ColorModal | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const close = () => setModal(null)
  const closeAndRefresh = () => {
    setModal(null)
    setRefreshKey((key) => key + 1)
  }

  return (
    <section className="mx-auto max-w-5xl">
      <PageHeader
        title="Colors"
        description="Name colors members can pick, each with its own role and hex code."
        actions={
          <Button variant="primary" icon={addIcon} onClick={() => setModal({ type: 'create' })}>
            Create color
          </Button>
        }
      />

      <ColorsTable
        onEdit={(color) => setModal({ type: 'edit', color })}
        onDelete={(color) => setModal({ type: 'delete', color })}
        refreshKey={refreshKey}
      />

      {(modal?.type === 'create' || modal?.type === 'edit') && (
        <ColorFormModal
          color={modal.type === 'edit' ? modal.color : undefined}
          onClose={close}
          onSaved={closeAndRefresh}
        />
      )}

      {modal?.type === 'delete' && (
        <DeleteColorModal color={modal.color} onClose={close} onDeleted={closeAndRefresh} />
      )}
    </section>
  )
}

export default Colors
