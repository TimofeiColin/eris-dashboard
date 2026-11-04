import { useState } from 'react'
import addIcon from '@material-symbols/svg-400/outlined/add.svg'
import { Button } from '../../components/buttons'
import { ListModal } from '../../components/modals'
import { PageHeader } from '../../components/page-header'
import { getColorsByGroup, type ColorGroup } from '../../api'
import GroupsTable from './GroupsTable.tsx'
import CreateGroupModal from './CreateGroupModal.tsx'
import EditGroupModal from './EditGroupModal.tsx'
import DeleteGroupModal from './DeleteGroupModal.tsx'

function Groups() {
  const [creating, setCreating] = useState(false)
  const [colorsGroup, setColorsGroup] = useState<ColorGroup | null>(null)
  const [editingGroup, setEditingGroup] = useState<ColorGroup | null>(null)
  const [deletingGroup, setDeletingGroup] = useState<ColorGroup | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <section className="mx-auto max-w-5xl">
      <PageHeader
        title="Color groups"
        description="Organize colors into families members can browse, like reds or pastels."
        actions={
          <Button variant="primary" icon={addIcon} onClick={() => setCreating(true)}>
            Create group
          </Button>
        }
      />

      <GroupsTable
        onShowColors={setColorsGroup}
        onEdit={setEditingGroup}
        onDelete={setDeletingGroup}
        refreshKey={refreshKey}
      />

      {creating && (
        <CreateGroupModal
          onClose={() => setCreating(false)}
          onCreated={() => {
            setCreating(false)
            setRefreshKey((key) => key + 1)
          }}
        />
      )}

      {editingGroup && (
        <EditGroupModal
          key={editingGroup._id}
          group={editingGroup}
          onClose={() => setEditingGroup(null)}
          onUpdated={() => {
            setEditingGroup(null)
            setRefreshKey((key) => key + 1)
          }}
        />
      )}

      {deletingGroup && (
        <DeleteGroupModal
          key={deletingGroup._id}
          group={deletingGroup}
          onClose={() => setDeletingGroup(null)}
          onDeleted={() => {
            setDeletingGroup(null)
            setRefreshKey((key) => key + 1)
          }}
        />
      )}

      {colorsGroup && (
        <ListModal
          key={colorsGroup._id}
          title={`${colorsGroup.name} colors`}
          onClose={() => setColorsGroup(null)}
          fetcher={(signal) => getColorsByGroup(colorsGroup._id, signal)}
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
