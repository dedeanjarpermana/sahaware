PGDMP         6            	    z         
   db_artikel    10.20    14.4 
    0           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            1           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            2           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            3           1262    24736 
   db_artikel    DATABASE     U   CREATE DATABASE db_artikel WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE db_artikel;
                postgres    false            �            1259    24737 
   tb_artikel    TABLE     ]   CREATE TABLE public.tb_artikel (
    id text NOT NULL,
    judul text,
    deskripsi text
);
    DROP TABLE public.tb_artikel;
       public            postgres    false            �            1259    24745    tb_user    TABLE     r   CREATE TABLE public.tb_user (
    user_id text NOT NULL,
    user_name text,
    email text,
    password text
);
    DROP TABLE public.tb_user;
       public            postgres    false            ,          0    24737 
   tb_artikel 
   TABLE DATA           :   COPY public.tb_artikel (id, judul, deskripsi) FROM stdin;
    public          postgres    false    196   3	       -          0    24745    tb_user 
   TABLE DATA           F   COPY public.tb_user (user_id, user_name, email, password) FROM stdin;
    public          postgres    false    197   �
       �           2606    24744    tb_artikel tb_artikel_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.tb_artikel
    ADD CONSTRAINT tb_artikel_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.tb_artikel DROP CONSTRAINT tb_artikel_pkey;
       public            postgres    false    196            �           2606    24752    tb_user tb_user_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.tb_user
    ADD CONSTRAINT tb_user_pkey PRIMARY KEY (user_id);
 >   ALTER TABLE ONLY public.tb_user DROP CONSTRAINT tb_user_pkey;
       public            postgres    false    197            ,   �  x�mRˎ�0<;_Q0�f �3�=p�p���x�^?&�C0O���V��8GN����,E�(�I��U�K��Y$ʆ�\���}�;o3���xL��_� Qy�ن$�u�u�u:��r|�}T\4��'��׾�����v���}7��w{�� �b�����'_x'_}���jrLBB�.�ȘeUp*7�p-6�#Wi,�E�[~����wAg1�!�؛�}�=%c�l�И:d�t'�W	/6-�4jP�g�*�)�fR�F��i�h[}1f`����.�q�����W�{��K}���>�"��%�}J�I�BҴ��v���6*��A=����6���~ �Ȋ��ӻ�B�@F��ё�d-���~XJ���0<<�O�;3���� @Ӵ�s|��1U��(�J4�.k'��kI=
�Rˣ����8M�MZV      -   F   x�3000�,-NIM�/JD��s3s���s9��ML��8Sr3� $6Ɯ�ũE�CA� �y!     