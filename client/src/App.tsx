import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorks,
  changeStatus,
  deleteWorks,
  getWorks,
  updateWorks,
} from "./store/reducers/worksReducer";
export default function App() {
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [checkIdDelete, setCheckIdDelete] = useState<number>(0);
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
  const works = useSelector((state: any) => {
    return state.works.works;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorks());
  }, [dispatch]);
  const addNewJob = (e: any) => {
    e.preventDefault();
    if (input.trim() === "") {
      setShowModalAdd(true);
      return;
    }
    const newJob = {
      name: input,
      status: false,
    };
    dispatch(addWorks(newJob));
    setInput("");
  };
  const handleChanged= (e: any) => {
    setInput(e.target.value);
  };
  const handleModalDelete = (id: number) => {
    setShowModalDelete(true);
    setCheckIdDelete(id);
  };
  const handleDeleteWorks = () => {
    dispatch(deleteWorks(checkIdDelete));
    setShowModalDelete(false);
  };
  const checkedWorks = (id: number, status: boolean) => {
    dispatch(changeStatus({ id, status: !status }));
  };
  const handleChange = (id: number) => {
    const find = works.find((item: any) => item.id === id);
    if (find) {
      setSelectedWorkId(id);
      setInput(find.name);
    }
  }
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWorkId !== null) {
      dispatch(updateWorks({ id: selectedWorkId, name: input }));
      setSelectedWorkId(null);
      setInput("");
    }
  };
  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <form className="d-flex justify-content-center align-items-center mb-4">
                    <div className="form-outline flex-fill">
                      <input
                        value={input}
                        onChange={handleChanged}
                        type="text"
                        id="form2"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form2">
                        Nhập tên công việc
                      </label>
                    </div>
                    <button
                      onClick={
                        selectedWorkId !== null ? handleUpdate : addNewJob
                      }
                      type="submit"
                      className="btn btn-info ms-2"
                    >
                      {selectedWorkId !== null ? "Cập nhật" : "Thêm"}
                    </button>
                  </form>
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li className="nav-item" role="presentation">
                      <a className="nav-link active">Tất cả</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Đã hoàn thành</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Chưa hoàn thành</a>
                    </li>
                  </ul>
                  {/* Tabs navs */}
                  {/* Tabs content */}
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {works.map((item: any, index: number) => (
                          <li
                            key={index}
                            className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                            style={{ backgroundColor: "#f4f6f7" }}
                          >
                            <div>
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                checked={item.status}
                                onClick={() => checkedWorks(item.id, item.status)}
                              />
                              {item.status ? (
                                <s>{item.name}</s>
                              ) : (
                                <p>{item.name}</p>
                              )}
                            </div>
                            <div className="d-flex gap-3">
                              <i
                                onClick={() => handleChange(item.id)}
                                className="fas fa-pen-to-square text-warning"
                              />
                              <i
                                onClick={() => handleModalDelete(item.id)}
                                className="far fa-trash-can text-danger"
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal xác nhận xóa */}
      {showModalDelete && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Xác nhận</h5>
              <i className="fas fa-xmark" />
            </div>
            <div className="modal-body-custom">
              <p>Bạn chắc chắn muốn xóa công việc này?</p>
            </div>
            <div className="modal-footer-footer">
              <button
                onClick={() => setShowModalDelete(false)}
                className="btn btn-light"
              >
                Hủy
              </button>
              <button onClick={handleDeleteWorks} className="btn btn-danger">
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      {showModalAdd && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Cảnh báo</h5>
              <i className="fas fa-xmark" />
            </div>
            <div className="modal-body-custom">
              <p>Tên công việc không được phép để trống.</p>
            </div>
            <div className="modal-footer-footer">
              <button
                onClick={() => setShowModalAdd(false)}
                className="btn btn-light"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}