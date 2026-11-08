import { useState } from 'react'
import addIcon from '@material-symbols/svg-400/outlined/add.svg'
import { Button } from '../../components/button'
import { ListModal } from '../../components/modal'
import { PageHeader } from '../../components/page-header'
import type { BotResponse } from '../../api'
import ResponsesTable from './ResponsesTable.tsx'
import ResponseFormModal from './ResponseFormModal.tsx'
import DeleteResponseModal from './DeleteResponseModal.tsx'

type ResponseModal =
  | { type: 'create' }
  | { type: 'edit'; item: BotResponse }
  | { type: 'delete'; item: BotResponse }
  | { type: 'responses'; item: BotResponse }

function Responses() {
  const [modal, setModal] = useState<ResponseModal | null>(null)

  const [refreshKey, setRefreshKey] = useState(0)

  const close = () => setModal(null)
  const closeAndRefresh = () => {
    setModal(null)
    setRefreshKey((key) => key + 1)
  }

  return (
    <section className="mx-auto max-w-5xl">
      <PageHeader
        title="Responses"
        description="Replies Eris sends to give the server some personality."
        actions={
          <Button variant="primary" icon={addIcon} onClick={() => setModal({ type: 'create' })}>
            Create response
          </Button>
        }
      />

      <ResponsesTable
        onShowResponses={(item) => setModal({ type: 'responses', item })}
        onEdit={(item) => setModal({ type: 'edit', item })}
        onDelete={(item) => setModal({ type: 'delete', item })}
        refreshKey={refreshKey}
      />

      {(modal?.type === 'create' || modal?.type === 'edit') && (
        <ResponseFormModal
          item={modal.type === 'edit' ? modal.item : undefined}
          onClose={close}
          onSaved={closeAndRefresh}
        />
      )}

      {modal?.type === 'delete' && (
        <DeleteResponseModal item={modal.item} onClose={close} onDeleted={closeAndRefresh} />
      )}

      {modal?.type === 'responses' && (
        <ListModal
          title={`Responses to “${modal.item.command}”`}
          onClose={close}
          items={modal.item.responses}
          getKey={(_, index) => index}
          renderItem={(reply) => reply}
          emptyMessage="This command has no responses yet."
        />
      )}
    </section>
  )
}

export default Responses
