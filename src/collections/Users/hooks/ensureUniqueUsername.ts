import { FieldHook, ValidationError } from 'payload'

export const ensureUniqueUsername: FieldHook = async ({ data, originalDoc, req, value }) => {
  if (originalDoc.username === value) {
    return value
  }

  const findDuplicateUsers = await req.payload.find({
    collection: 'users',
    where: {
      username: {
        equals: value,
      },
    },
  })

  if (findDuplicateUsers.docs.length > 0 && req.user) {
    throw new ValidationError({
      errors: [
        {
          message: `A user with the username ${value} already exists. Usernames must be unique.`,
          path: 'username',
        },
      ],
    })
  }

  return value
}
