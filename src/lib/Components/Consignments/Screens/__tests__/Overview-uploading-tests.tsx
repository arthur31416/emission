import Overview from "../Overview"

jest.mock("../../Submission/uploadPhotoToGemini", () => ({ uploadImageAndPassToGemini: jest.fn() }))
import { uploadImageAndPassToGemini } from "../../Submission/uploadPhotoToGemini"

const nav = {} as any
const route = {} as any

beforeEach(jest.resetAllMocks)

it("does nothing when there's no photos in setuip", () => {
  const overview = new Overview({ nav, route, setup: {} })
  overview.uploadPhotosIfNeeded()
  expect(uploadImageAndPassToGemini).not.toBeCalled()
})

it("uploads a photo when there's an photo without upload as true", () => {
  const overview = new Overview({
    nav,
    route,
    setup: { submission_id: 1, photos: [{ file: "/a/b/c.png", uploaded: false }] },
  })
  overview.uploadPhotosIfNeeded()
  expect(uploadImageAndPassToGemini).toBeCalledWith("/a/b/c.png", "private", 1)
})

it("doesnt upload a photo when when uploading is true", () => {
  const photos = [
    { file: "/a/b/c.png", uploaded: false, uploading: true },
    { file: "/a/b/d.png", uploaded: false, uploading: false },
  ]
  const overview = new Overview({
    nav,
    route,
    setup: { submission_id: 1, photos },
  })
  overview.uploadPhotosIfNeeded()
  expect(uploadImageAndPassToGemini).not.toBeCalled()
})