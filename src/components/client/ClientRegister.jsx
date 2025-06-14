import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getClients, getClientById, createClient, updateClient as updateClientApi } from "./api";
import { IMaskInput } from 'react-imask';
import ModalDialog from '../shared/modal/ModalDialog';

function ClientRegister({ onRegister }) {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
  });
  const navigate = useNavigate();

  const [clients, setClients] = React.useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showErrorDialog, setErrorShowDialog] = useState(false);
  const [showNewClient, setshowNewClient] = useState(false);  
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Função para lidar com mudanças nos campos
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Função para buscar dados do CEP
  const fetchCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setForm(f => ({
          ...f,
          address: data.logradouro || '',
          city: data.localidade || '',
          state: data.uf || ''
        }));
      }
    } catch (err) {
      // Não faz nada se erro
    }
  };

  useEffect(() => {
    getClients()
      .then(data => {
        if (Array.isArray(data)) {
          setClients(data);
        } else if (data.success) {
          setClients(data.data);
        } else {
          setClients([]);
        }
      })
      .catch(error => {
        setClients([]);
        setErrorMsg('Erro ao buscar os dados');
        setErrorShowDialog(true);
      });
  }, []);

  useEffect(() => {
    if (window.location.pathname.startsWith('/editar-cliente/')) {
      setIsEdit(true);
      const id = window.location.pathname.split('/').pop();
      setEditId(id);
      getClientById(id)
        .then(data => {
          if (data.success && data.data) {
            setForm({
              name: data.data.name || '',
              email: data.data.email || '',
              phone: data.data.phone || '',
              address: data.data.address || '',
              city: data.data.city || '',
              state: data.data.state || '',
              zip_code: data.data.zip_code || ''
            });
          }
        })
        .catch(error => {
          // Se der erro, mantém o formulário vazio
          console.error('Erro ao buscar cliente para edição:', error);
        });
    } else {
      setIsEdit(false);
      setEditId(null);
    }
  }, []);

  const addClient = (e) => {
    e.preventDefault();
    createClient(form)
      .then(data => {
        if(data.success){
          setSuccessMsg('Cliente cadastrado com sucesso!');
          setshowNewClient(true);
          setShowDialog(true);
          setForm({ name: '', email: '', phone: '', address: '', city: '', state: '', zip_code: '' });
        } else{
          setErrorMsg(data.error);
          setErrorShowDialog(true);
        }
      })
      .catch(error => {
        setErrorMsg('Erro ao cadastrar cliente.');
        setErrorShowDialog(true);
      });
  };

  const updateClient = (e) => {
    e.preventDefault();
    updateClientApi(editId, form)
      .then(data => {
        if(data.success){
          setSuccessMsg('Cliente atualizado com sucesso!');
          setshowNewClient(false);
          setShowDialog(true);
        } else{
          setSuccessMsg(data.error);
          setShowDialog(true);
        }
      })
      .catch(error => {
        setSuccessMsg('Erro ao atualizar cliente.');
        setShowDialog(true);
        console.error('Erro ao atualizar cliente:', error);
      });
  };

  const handleDialogOk = () => {
    setShowDialog(false);
    navigate('/');
  };

  const handleDialogCancel = () => {
    setShowDialog(false); 
    setErrorShowDialog(false);
  }

  const handleDialogNovo = () => {
    setShowDialog(false);
    setForm({ name: '', email: '', phone: '', address: '', city: '', state: '', zip_code: '' });
  };

  return (
    <div className="app-container">
      <button
        type="button"
        className="btn btn-light position-absolute app-btn"
        style={{ top: 20, left: 20, zIndex: 10, boxShadow: '0 1px 4px #ccc', borderRadius: '50%', padding: '0.4rem 0.7rem' }}
        onClick={() => navigate(-1)}
        aria-label="Voltar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15.5 19l-7-7 7-7" stroke="#333" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <h2 className='app-title'>Cadastro de Cliente</h2>
      <form onSubmit={isEdit ? updateClient : addClient} className="app-form">
                  <div className="col-12">
            <label className="form-label mb-1" style={{ fontSize: '0.97rem' }}>Nome</label>
            <input type="text" className="form-control form-control-sm" name="name" value={form.name} onChange={handleChange} required style={{ fontSize: '0.97rem' }} />
          </div>
          <div className="col-12">
            <label className="form-label mb-1" style={{ fontSize: '0.97rem' }}>Email</label>
            <input type="email" className="form-control form-control-sm" name="email" value={form.email} onChange={handleChange} required style={{ fontSize: '0.97rem' }} />
          </div>
          <div className="col-12">
            <label className="form-label mb-1" style={{ fontSize: '0.97rem' }}>Telefone</label>
            <IMaskInput
              mask="(00) 00000-0000"
              value={form.phone}
              onAccept={value => setForm({ ...form, phone: value })}
              className="form-control form-control-sm"
              name="phone"
              required
              style={{ fontSize: '0.97rem' }}
            />
          </div>
        <div className="row gy-2 flex-column">
          <div className="col-12">
            <label className="form-label mb-1" style={{ fontSize: '0.97rem' }}>CEP</label>
            <IMaskInput
              mask="00000-000"
              value={form.zip_code}
              onAccept={value => setForm({ ...form, zip_code: value })}
              className="form-control form-control-sm"
              name="zip_code"
              required
              style={{ fontSize: '0.97rem' }}
              placeholder="00000-000"
              onBlur={e => {
                if (e.target.value && e.target.value.replace(/\D/g, '').length === 8) fetchCep(e.target.value);
              }}
            />
          </div>
          <div className="col-12">
            <label className="form-label mb-1" style={{ fontSize: '0.97rem' }}>Endereço</label>
            <input type="text" className="form-control form-control-sm" name="address" value={form.address} onChange={handleChange} required style={{ fontSize: '0.97rem' }} />
          </div>
          <div className="col-12">
            <label className="form-label mb-1" style={{ fontSize: '0.97rem' }}>Cidade</label>
            <input type="text" className="form-control form-control-sm" name="city" value={form.city} onChange={handleChange} required style={{ fontSize: '0.97rem' }} />
          </div>
          <div className="col-12">
            <label className="form-label mb-1" style={{ fontSize: '0.97rem' }}>Estado</label>
            <input type="text" className="form-control form-control-sm" name="state" value={form.state} onChange={handleChange} required style={{ fontSize: '0.97rem' }} maxLength={2} />
          </div>

        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3 app-btn">{isEdit ? 'Atualizar Cliente' : 'Cadastrar Cliente'}</button>
      </form>
      
      <ModalDialog
        show={showDialog}
        title={successMsg}
        onOk={showNewClient ? handleDialogNovo : handleDialogOk}
        okText={showNewClient ? 'Cadastrar novo cliente' : 'Ok'}
        onCancel={showNewClient ? handleDialogOk : undefined}
        cancelText={showNewClient ? 'Voltar à lista' : undefined}
      />

      <ModalDialog
        show={showErrorDialog}
        title={errorMsg}
        onOk={handleDialogCancel}
        okText="Ok"
      />
    </div>
  );
}

export default ClientRegister;
