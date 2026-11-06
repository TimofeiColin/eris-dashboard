import { useState } from 'react'
import addIcon from '@material-symbols/svg-400/outlined/add.svg'
import { Button } from '../../components/button'
import { ListModal } from '../../components/modal'
import { PageHeader } from '../../components/page-header'
import { colorsApi, type ColorGroup } from '../../api'
import GroupsTable from './GroupsTable.tsx'
import GroupFormModal from './GroupFormModal.tsx'
import DeleteGroupModal from './DeleteGroupModal.tsx'

type GroupModal =
  | { type: 'create' }
  | { type: 'edit'; group: ColorGroup }
  | { type: 'delete'; group: ColorGroup }
  | { type: 'colors'; group: ColorGroup }

function Groups() {
  const [modal, setModal] = useState<GroupModal | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const close = () => setModal(null)
  const closeAndRefresh = () => {
    setModal(null)
    setRefreshKey((key) => key + 1)
  }

  return (
    <section className="mx-auto max-w-5xl">
      <PageHeader
        title="Color groups"
        description="Organize colors into families members can browse, like reds or pastels."
        actions={
          <Button variant="primary" icon={addIcon} onClick={() => setModal({ type: 'create' })}>
            Create group
          </Button>
        }
      />

      <GroupsTable
        onShowColors={(group) => setModal({ type: 'colors', group })}
        onEdit={(group) => setModal({ type: 'edit', group })}
        onDelete={(group) => setModal({ type: 'delete', group })}
        refreshKey={refreshKey}
      />

      {(modal?.type === 'create' || modal?.type === 'edit') && (
        <GroupFormModal
          group={modal.type === 'edit' ? modal.group : undefined}
          onClose={close}
          onSaved={closeAndRefresh}
        />
      )}

      {modal?.type === 'delete' && (
        <DeleteGroupModal group={modal.group} onClose={close} onDeleted={closeAndRefresh} />
      )}

      {modal?.type === 'colors' && (
        <ListModal
          title={`${modal.group.name} colors`}
          onClose={close}
          fetcher={(signal) => colorsApi.listNames(modal.group._id, signal)}
          getKey={(color) => color._id}
          renderItem={(color) => color.name}
          errorMessage="Couldn't load colors right now. Please try again later."
          emptyMessage="This group has no colors yet."
        />
      )}
    </section>
  )
}

export default Groups
